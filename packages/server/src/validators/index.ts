import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";
import { Types } from "mongoose";
import { CityModel, DistrictModel, ProvinceModel } from "../models/Location";
import { VendorModel } from "../models/Vendor";
//todo: below code should be distributed to files


@ValidatorConstraint({ name: "Email already exist", async: true })
class IsEmailExist implements ValidatorConstraintInterface {
    async validate(text: string, args: ValidationArguments) {
        let res = await VendorModel.findOne({ email: text });
        return !res;
    }

    defaultMessage(args: ValidationArguments) {
        return "Email Already Exist Bro!";
    }
}

@ValidatorConstraint({ async: true })
class IsValidSLPhone implements ValidatorConstraintInterface {
    async validate(phone: string, hello: any) {
        function isNumeric(str: string) {
            if (typeof str != "string") return false;
            return !isNaN(str as any) && !isNaN(parseFloat(str));
        }
        const acceptLan = hello.object.lanOk;

        if (!phone.startsWith('+94')) return false;

        phone = phone.slice(3);

        function isCorrectVendor(v: string) {
            if (
                v === '77' ||
                v === '76' ||
                v === '75' ||
                v === '71' ||
                v === '72' ||
                v === '78'
            ) {
                return true;
            }

            if (acceptLan) {
                if (
                    v === '11'
                ) {
                    return true;
                }
            }

            return false;
        }

        if (!isNumeric(phone)) return false;

        if (phone.includes('.')) return false;

        if (phone.length !== 9) return false;

        if (Number(phone) < 0) return false;

        if (!isCorrectVendor(phone.slice(0, 2))) return false;

        return true;
    }

    defaultMessage(args: ValidationArguments) {
        return "Not a valid phone number";
    }
}

@ValidatorConstraint({ async: true })
class IsVendorProfilePhone implements ValidatorConstraintInterface {
    async validate(phone: string) {
        return !!(await (VendorModel.findOne({ phone: phone })));
    }

    defaultMessage(args: ValidationArguments) {
        return "Not a valid phone number";
    }
}

@ValidatorConstraint({ async: true })
class IsPhoneExist implements ValidatorConstraintInterface {
    async validate(text: string, args: ValidationArguments) {
        let res = await VendorModel.findOne({ phone: text });
        return !res;
    }

    defaultMessage(args: ValidationArguments) {
        return "Phone Already Exist Bro!";
    }
}

@ValidatorConstraint({ async: true })
class IsBusinessNameExist implements ValidatorConstraintInterface {
    async validate(text: string, args: ValidationArguments) {
        let res = await VendorModel.findOne({ businessName: text });
        return !res;
    }

    defaultMessage(args: ValidationArguments) {
        return "Business Name Already Exist Bro!";
    }
}

@ValidatorConstraint({ async: true })
class IsValidBusinessName implements ValidatorConstraintInterface {
    async validate(text: string, args: ValidationArguments) {
        return text.length > 2;
    }

    defaultMessage(args: ValidationArguments) {
        return "Invalid Business Name";
    }
}

@ValidatorConstraint({ async: true })
class IsValidPassword implements ValidatorConstraintInterface {
    async validate(password: string, args: ValidationArguments) {

        const passwordPattern = /^[A-Za-z\.\)\(\*\&\^\%\$\#\@\!\[\]\{\}\-\_\=\+\?<>0-9~]{8,14}$/;

        const res = password.match(passwordPattern);
        if (!res) return false;
        return true;
    }

    defaultMessage(args: ValidationArguments) {
        return "not a valid password!";
    }
}

@ValidatorConstraint({ async: true })
class IsCityID implements ValidatorConstraintInterface {
    async validate(id: string, args: ValidationArguments) {
        if (!Types.ObjectId.isValid(id)) return false;
        return !!(await CityModel.findById(new Types.ObjectId(id)));
    }

    defaultMessage(args: ValidationArguments) {
        return "not a valid city id!";
    }
}

@ValidatorConstraint({ async: true })
class IsDistrictID implements ValidatorConstraintInterface {
    async validate(id: string, args: ValidationArguments) {
        if (!Types.ObjectId.isValid(id)) return false;
        return !!(await DistrictModel.findById(new Types.ObjectId(id)));
    }

    defaultMessage(args: ValidationArguments) {
        return "not a valid district id!";
    }
}

@ValidatorConstraint({ async: true })
class IsProvinceID implements ValidatorConstraintInterface {
    async validate(id: string, args: ValidationArguments) {
        if (!Types.ObjectId.isValid(id)) return false;
        return !!(await ProvinceModel.findById(new Types.ObjectId(id)));
    }

    defaultMessage(args: ValidationArguments) {
        return "not a valid provice id!";
    }
}


@ValidatorConstraint({ async: true })
class IsObjectID implements ValidatorConstraintInterface {
    async validate(id: string, args: ValidationArguments) {
        let dd = !!Types.ObjectId.isValid(id);
        return dd;
        // return !!Types.ObjectId.isValid(id);
    }

    defaultMessage(args: ValidationArguments) {
        return "not a valid id!";
    }
}

export {
    IsEmailExist,
    IsVendorProfilePhone,
    IsValidSLPhone,
    IsPhoneExist,
    IsBusinessNameExist,
    IsValidPassword,
    IsCityID,
    IsObjectID,
    IsDistrictID,
    IsValidBusinessName,
    IsProvinceID
};
