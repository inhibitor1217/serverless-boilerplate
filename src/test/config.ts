import { loadEnv } from "../config";

import chai from "chai";
import chaiHttp from "chai-http";
import chaiAsPromised from "chai-as-promised";

export default function () {
  loadEnv();

  chai.use(chaiHttp);
  chai.use(chaiAsPromised);
}
