const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const expect = chai.expect;
const nock = require('nock');
const IFTTT = require('../');

const testKey = 'testkey';
const testEvent = 'testevent';
const testBadEvent = 'testbadevent';
const okText = `Congratulations! You've fired the ${testEvent} event`;
const domain = 'https://maker.ifttt.com';
const okPath = `/trigger/${testEvent}/with/key/${testKey}`;
const errorPath = `/trigger/${testBadEvent}/with/key/${testKey}`;
const errorInvalidKey = { errors: [{ message: 'You sent an invalid key.' }] };

let ifttt;

describe('General', () => {
  it('throws an error when omitting key', () => {
    const badInit = () => { ifttt = new IFTTT(); };
    expect(badInit).to.throw('You need to set a secret in order to do a request');
  });

  it('throws and error when omitting event', () => {
    ifttt = new IFTTT(testKey);
    const badCall = () => { ifttt.request(null, () => {}); };
    expect(badCall).to.throw('Request needs at least an event to work');
  });

  it('rejects Promise when omitting event', () => {
    ifttt = new IFTTT(testKey);
    expect(ifttt.request()).to.be.rejected;
  });
});

describe('Callback request', () => {
  beforeEach(() => {
    nock(domain)
      .get(okPath)
      .reply(200, okText)
      .post(okPath)
      .reply(200, okText);

    ifttt = new IFTTT(testKey);
  });

  afterEach(() => {
    nock.cleanAll();
    ifttt = null;
  });

  it('GET using event string OK with callback', (done) => {
    ifttt.request(testEvent, (err, body) => {
      expect(body).to.equal(okText);
      expect(err).to.be.null;
      done();
    });
  });

  it('GET using event object OK with callback', (done) => {
    ifttt.request({ event: testEvent }, (err, body) => {
      expect(body).to.equal(okText);
      expect(err).to.be.null;
      done();
    });
  });

  it('POST using event object OK with callback', (done) => {
    ifttt.request({ method: 'POST', event: testEvent }, (err, body) => {
      expect(body).to.equal(okText);
      expect(err).to.be.null;
      done();
    });
  });
});

describe('Promise request', () => {
  beforeEach(() => {
    nock(domain)
      .get(okPath)
      .reply(200, okText)
      .post(okPath)
      .reply(200, okText);

    ifttt = new IFTTT(testKey);
  });

  afterEach(() => {
    nock.cleanAll();
    ifttt = null;
  });

  it('GET using event string OK with Promise', () =>
    expect(ifttt.request(testEvent)).to.become(okText));

  it('GET using event object OK with Promise', () =>
    expect(ifttt.request({ event: testEvent })).to.become(okText));

  it('POST using event object OK with Promise', () =>
    expect(ifttt.request({ method: 'POST', event: testEvent })).to.become(okText));
});

describe('Request rejections', () => {
  beforeEach(() => {
    nock(domain)
      .get(errorPath)
      .reply(401, errorInvalidKey)
      .post(errorPath)
      .reply(401, errorInvalidKey);

    ifttt = new IFTTT(testKey);
  });

  afterEach(() => {
    nock.cleanAll();
    ifttt = null;
  });

  it('GET using event string Rejected with Promise', () =>
    expect(ifttt.request(testBadEvent)).to.be.rejectedWith(errorInvalidKey.errors));

  it('GET using event object Rejected with Promise', () =>
    expect(ifttt.request({ event: testBadEvent })).to.be.rejectedWith(errorInvalidKey.errors));

  it('POST using event object Rejected with Promise', () =>
    expect(ifttt.request({ method: 'POST', event: testBadEvent })).to.be.rejectedWith(errorInvalidKey.errors));

  it('GET using event string ERROR with callback', (done) => {
    ifttt.request(testBadEvent, (err, body) => {
      expect(body).to.be.null;
      expect(err).to.not.be.null;
      done();
    });
  });
});
