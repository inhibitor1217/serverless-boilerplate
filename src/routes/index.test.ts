import { assert, request } from 'chai';
import testConfig from '../test/config';
import { getBuildStr } from '../utils/misc';

testConfig();

describe(`Running tests for ${getBuildStr()} ...`, () => {
  it('Server is alive and responding', (done) => {
    request(process.env.HOST)
      .get('/')
      .then((res) => {
        assert.equal(res.status, 200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
