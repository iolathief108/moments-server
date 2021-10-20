import {Field, InputType} from 'type-graphql';
import {VendorDataDoc} from '../../models/VendorData';
import {VendorType} from '../../common/const';
import {commit, tokenExists} from '../../mediaAPI/largeImage';


@InputType()
export class PersonPhotoInput {

    @Field(() => String, {nullable: true})
    token?: string;

    wd?: number;

    ht?: number;

    id?: string;

    _isUrlCommited?: boolean;

    validate() {
        if (this._isUrlCommited)
            throw new Error('validator should run before url commit');

        console.log(this.token);
        if (this.token && !tokenExists(this.token)) {
            throw new Error('given token is not valid!');
        }
    }


    async getCommitDetail() {
        const ret = await commit(this.token);
        if (!ret) throw new Error('Not recognizable!')
        this.wd = ret.wd;
        this.ht = ret.ht;
        this.id = ret.id;

        return {
            wd: this.wd,
            ht: this.ht,
            id: this.id,
        }
    }
}

@InputType()
export class PersonInfoInput {
    @Field(() => PersonPhotoInput, {nullable: true})
    personPhoto?: PersonPhotoInput;

    @Field(() => String, {nullable: false})
    name: string;

    @Field(() => String, {nullable: true})
    position?: string;

    validate() {

        console.log(this.personPhoto);
        if (this.name.length > 30 || this.name.length < 2) {
            throw new Error('name lenght should be more than 2 characters or less than 30 characters');
        }
        if (this.position && (this.position.length > 30 || this.position.length < 2)) {
            throw new Error('name lenght should be more than 2 characters or less than 30 characters');
        }
        this.personPhoto.validate()
    }

    async fillVendorData(vData: VendorDataDoc) {
        switch (vData.vendor_type) {
            case VendorType.bands_dj:
                if (!vData?.bandDjs?.person_info?.person_photo?.id && !this?.personPhoto?.token) {
                    throw new Error('Your profile photo is must')
                }
                vData.bandDjs.person_info = {
                    name: this.name,
                    position: this.position || undefined,
                    person_photo: this?.personPhoto?.token ? await this.personPhoto.getCommitDetail() : vData.bandDjs.person_info.person_photo,
                };
                break;
            case VendorType.beauty_professional:
                if (!vData?.beautyProfessional?.person_info?.person_photo?.id && !this?.personPhoto?.token) {
                    throw new Error('Your profile photo is must')
                }
                vData.beautyProfessional.person_info = {
                    name: this.name,
                    position: this.position || undefined,
                    person_photo: this?.personPhoto?.token ? await this.personPhoto.getCommitDetail() : vData.beautyProfessional.person_info.person_photo,
                };
                break;
            case VendorType.cakes_dessert:
                if (!vData?.cakesDesserts?.person_info?.person_photo?.id && !this?.personPhoto?.token) {
                    throw new Error('Your profile photo is must')
                }
                vData.cakesDesserts.person_info = {
                    name: this.name,
                    position: this.position || undefined,
                    person_photo: this?.personPhoto?.token ? await this.personPhoto.getCommitDetail() : vData.cakesDesserts.person_info.person_photo,
                };
                break;
            case VendorType.caterer:
                if (!vData?.caterer?.person_info?.person_photo?.id && !this?.personPhoto?.token) {
                    throw new Error('Your profile photo is must')
                }
                vData.caterer.person_info = {
                    name: this.name,
                    position: this.position || undefined,
                    person_photo: this?.personPhoto?.token ? await this.personPhoto.getCommitDetail() : vData.caterer.person_info.person_photo,
                };
                break;
            case VendorType.florist:
                if (!vData?.florists?.person_info?.person_photo?.id && !this?.personPhoto?.token) {
                    throw new Error('Your profile photo is must')
                }
                vData.florists.person_info = {
                    name: this.name,
                    position: this.position || undefined,
                    person_photo: this?.personPhoto?.token ? await this.personPhoto.getCommitDetail() : vData.florists.person_info.person_photo,
                };
                break;
            case VendorType.photographer:
                if (!vData?.photographer?.person_info?.person_photo?.id && !this?.personPhoto?.token) {
                    throw new Error('Your profile photo is must')
                }
                vData.photographer.person_info = {
                    name: this.name,
                    position: this.position || undefined,
                    person_photo: this?.personPhoto?.token ? await this.personPhoto.getCommitDetail() : vData.photographer.person_info.person_photo,
                };
                break;
            case VendorType.videographer:
                if (!vData?.videographer?.person_info?.person_photo?.id && !this?.personPhoto?.token) {
                    throw new Error('Your profile photo is must')
                }
                vData.videographer.person_info = {
                    name: this.name,
                    position: this.position || undefined,
                    person_photo: this?.personPhoto?.token ? await this.personPhoto.getCommitDetail() : vData.videographer.person_info.person_photo,
                };
                break;
            default:
                throw new Error('Vendor type is missing');
        }
    }
}
