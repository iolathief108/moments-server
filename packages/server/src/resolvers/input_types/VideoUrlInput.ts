import {Field, InputType} from 'type-graphql';
import {IsUrl, Validate} from 'class-validator';
import {IsValidVimeoUrl, IsValidYoutubeUrl} from '../../validators';
import {commit, tokenExists} from '../../mediaAPI/largeImage';

@InputType()
export class CustomThumbnailInput {

    @Field(() => String, {nullable: true})
    token?: string;

    wd: number;

    ht: number;

    @Field(() => String, {nullable: true})
    id: string;

    _isUrlCommited?: boolean;

    validate() {
        if (this._isUrlCommited)
            throw new Error('validator should run before url commit');

        if (this.token && !tokenExists(this.token)) {
            throw new Error('given token is not valid!');
        }
    }


    async getCommitDetail() {
        const ret = await commit(this.token);
        if (!ret) throw new Error('Not recognizable!')
        this.wd = ret.wd;
        this.ht = ret.ht;
        this.id = ret.id

        return {
            wd: this.wd,
            ht: this.ht,
            id: this.id,
        }
    }
}

@InputType()
export class VideoUrlInput {
    @Field({nullable: true})
    @IsUrl()
    @Validate(IsValidVimeoUrl)
    vimeoUrl?: string;

    @Field({nullable: true})
    @IsUrl()
    @Validate(IsValidYoutubeUrl)
    youtubeUrl?: string;

    @Field(() => String, {nullable: true})
    videoTitle?: string;

    @Field(() => String, {nullable: true})
    videoType?: string;

    @Field(() => CustomThumbnailInput, {nullable: true})
    customThumbnail?: CustomThumbnailInput;

    validate(){
        if (this.vimeoUrl && this.youtubeUrl) {
            throw new Error('Should be youtube or vimoe url');
        }
        if (!this.vimeoUrl && !this.youtubeUrl) {
            throw new Error('Should be youtube or vimeo url');
        }
        if (this.customThumbnail) {
            this.customThumbnail.validate();
        }
    }
    async commit() {
        if (this.customThumbnail) {
            return await this.customThumbnail.getCommitDetail()
        }
    }
}
