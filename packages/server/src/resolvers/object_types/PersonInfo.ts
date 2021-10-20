import {Field, ObjectType} from 'type-graphql';
import {Image} from './Image';


@ObjectType()
export class PersonInfo {
    @Field(() => Image, {nullable: false})
    person_photo: Image;

    @Field(() => String, {nullable: false})
    name: string;

    @Field(() => String, {nullable: true})
    position?: string;
}
