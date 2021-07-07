import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";
import {Types} from "mongoose";
import {CityModel, DistrictModel, ProvinceModel} from "../models/Location";
import {VendorModel} from "../models/Vendor";
//todo: below code should be distributed to files


@ValidatorConstraint({name: "Email already exist", async: true})
class IsEmailExist implements ValidatorConstraintInterface {
    async validate(text: string, args: ValidationArguments) {
        let res = await VendorModel.findOne({email: text});
        return !res;
    }

    defaultMessage(args: ValidationArguments) {
        return "Email Already Exist Bro!";
    }
}

@ValidatorConstraint({async: true})
class IsValidPhone implements ValidatorConstraintInterface {
    async validate(phone: string) {
        if (/\s/g.test(phone)) return false;
        if (phone.length !== 9) return false;
        return /^[0-9]+$/g.test(phone);
    }

    defaultMessage(args: ValidationArguments) {
        return "Not a valid phone number";
    }
}

@ValidatorConstraint({async: true})
class IsPhoneExist implements ValidatorConstraintInterface {
    async validate(text: string, args: ValidationArguments) {
        let res = await VendorModel.findOne({phone: text});
        return !res;
    }

    defaultMessage(args: ValidationArguments) {
        return "Phone Already Exist Bro!";
    }
}

@ValidatorConstraint({async: true})
class IsBusinessNameExist implements ValidatorConstraintInterface {
    async validate(text: string, args: ValidationArguments) {
        let res = await VendorModel.findOne({businessName: text});
        return !res;
    }

    defaultMessage(args: ValidationArguments) {
        return "Business Name Already Exist Bro!";
    }
}

@ValidatorConstraint({async: true})
class IsValidBusinessName implements ValidatorConstraintInterface {
    async validate(text: string, args: ValidationArguments) {
        return text.length > 2;
    }

    defaultMessage(args: ValidationArguments) {
        return "Invalid Business Name";
    }
}

@ValidatorConstraint({async: true})
class IsValidPassword implements ValidatorConstraintInterface {
    async validate(password: string, args: ValidationArguments) {
        if (password.length < 8) return false;
        //
        return true;
    }

    defaultMessage(args: ValidationArguments) {
        return "not a valid password!";
    }
}

@ValidatorConstraint({async: true})
class IsCityID implements ValidatorConstraintInterface {
    async validate(id: string, args: ValidationArguments) {
        if (!Types.ObjectId.isValid(id)) return false;
        return !!(await CityModel.findById(new Types.ObjectId(id)));
    }

    defaultMessage(args: ValidationArguments) {
        return "not a valid city id!";
    }
}

@ValidatorConstraint({async: true})
class IsDistrictID implements ValidatorConstraintInterface {
    async validate(id: string, args: ValidationArguments) {
        if (!Types.ObjectId.isValid(id)) return false;
        return !!(await DistrictModel.findById(new Types.ObjectId(id)));
    }

    defaultMessage(args: ValidationArguments) {
        return "not a valid district id!";
    }
}

@ValidatorConstraint({async: true})
class IsProvinceID implements ValidatorConstraintInterface {
    async validate(id: string, args: ValidationArguments) {
        if (!Types.ObjectId.isValid(id)) return false;
        return !!(await ProvinceModel.findById(new Types.ObjectId(id)));
    }

    defaultMessage(args: ValidationArguments) {
        return "not a valid provice id!";
    }
}


@ValidatorConstraint({async: true})
class IsObjectID implements ValidatorConstraintInterface {
    async validate(id: string, args: ValidationArguments) {
        // console.log('2 -> '+!!Types.ObjectId.isValid(id))
        return !!Types.ObjectId.isValid(id);
        // return true
    }

    defaultMessage(args: ValidationArguments) {
        return "not a valid id!";
    }
}

export {
    IsEmailExist,
    IsValidPhone,
    IsPhoneExist,
    IsBusinessNameExist,
    IsValidPassword,
    IsCityID,
    IsObjectID,
    IsDistrictID,
    IsValidBusinessName,
    IsProvinceID
};
