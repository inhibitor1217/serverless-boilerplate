import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';
import { loadEnv } from '../config';

export default function loadTestEnv(): void {
  loadEnv();

  chai.use(chaiHttp);
  chai.use(chaiAsPromised);
}
