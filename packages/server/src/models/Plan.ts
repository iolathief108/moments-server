import { getModelForClass, prop } from "@typegoose/typegoose";
import { VendorType } from "../common/const";

class plan {

  @prop({ required: true, enum: Object.values(VendorType), type: () => String })
  vendor_type: string

  @prop({ required: true, type: () => Number })
  rate: number

  @prop({ required: true, type: () => Number})
  months: number
}

export const PlanModel = getModelForClass(plan)