import { getModelForClass, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { SubscriptionType } from "../common/const";

export class subscription {
  @prop({ required: true })
  subscription_id: number;
  
  @prop({ required: true })
  amount: number;
  
  @prop({ type: () => Date, required: true })
  subscription_period_start: Date;
  
  @prop({ type: () => Date, required: true })
  subscription_period_end: Date;
  
  @prop({ type: () => Date, required: true })
  transaction_date: Date;
  
  @prop({ required: true })
  account_id: Types.ObjectId;
  
  @prop({ required: true })
  plan_id: Types.ObjectId;
  
  @prop({ type: () => String, required: true })
  payment_method: string;
  
  @prop({ type: () => String, required: true, enum: SubscriptionType })
  subscription_type: string;
}

export const subscriptionModel = getModelForClass(subscription)
