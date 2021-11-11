import {Field, ObjectType} from "type-graphql";
import {Image} from './Image';

@ObjectType()
export class VideoUrl {
    @Field({nullable: true})
    vimeoUrl?: string;

    @Field({nullable: true})
    youtubeUrl?: string;

    @Field(() => String, {nullable: true})
    videoTitle?: string;

    @Field(() => String, {nullable: true})
    videoType?: string;

    @Field(() => Image, {nullable: true})
    customThumbnail?: Image;
}

