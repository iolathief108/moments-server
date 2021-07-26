import util from "util";
import fs from "fs";

export default util.promisify(fs.readFile)
