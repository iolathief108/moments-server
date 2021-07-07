import { modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({ options: {customName: 'frequent_question'}})
export class FrequentQuestionSchema {
    @prop({required: true, type: () => String})
    question: string;

    @prop({required: true, type: () => String})
    answer: string;
}
