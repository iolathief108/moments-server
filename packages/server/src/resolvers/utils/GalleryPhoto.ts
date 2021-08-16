import {Field, InputType} from 'type-graphql';
import {VendorDataDoc} from '../../models/VendorData';
import {tokenExists, commit} from '../../mediaAPI/largeImage';
import {ImageSchema} from '../../models/objects/Image';

@InputType()
export class GalleryPhotoInput {
    @Field(() => String, {nullable: true})
    token?: string;

    @Field(() => String, {nullable: true})
    id?: string;

    wd?: number;

    ht?: number;

    _isUrlCommited?: boolean;

    validate(vData: VendorDataDoc) {
        if (this._isUrlCommited)
            throw new Error('validator should run before url commit');

        if (this.token && this.id)
            throw new Error('only one should be allowed');

        if (!this.token && !this.id) throw new Error('one should be included');

        // no photo url in the database but there is url in the input
        if (!vData.gallery_photos && this.id)
            throw new Error('given id is not valid!');

        if (this.token) {
            if (!tokenExists(this.token)) {
                throw new Error('given token is not valid!');
            }
        }

        // check for fake url
        if (
            vData.gallery_photos &&
            this.id &&
            !vData.gallery_photos.find((photo_url) => photo_url.id === this.id)
        ) {
            throw new Error('no url found');
        }
    }

    async fillUrl(vData: VendorDataDoc) {
        if (!this.token) {
            const thing = vData.gallery_photos.find(
                (photo) => photo.id === this.id,
            );
            this.ht = thing.ht;
            this.wd = thing.wd;
            return;
        }
        const ret = await commit(this.token);
        if (!ret) throw new Error('Not recognizable!')
        this.wd = ret.wd;
        this.ht = ret.ht;
        this.id = ret.id;
    }

    getImageDetail(): ImageSchema {
        return {
            wd: this.wd,
            ht: this.ht,
            id: this.id,
        };
    }
}
