import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType({description: "Edit common vendor details"})
export class FrequentQuestionInput {
    @Field()
    @Length(8, 255)
    question: string;

    @Field()
    @Length(1, 512)
    answer: string;
}
