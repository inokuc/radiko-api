const RadikoApi = require('../index');
const assert = require('assert');

function isFunc(target) {
  return "function" === typeof target;
}

describe('RadikoApi test', function() {

  describe('basis', function() {
    it('module exists', function() {
      assert(null !== RadikoApi())
      assert(undefined !== RadikoApi())
    });
  });

  describe('Get area id', function() {
    it('function exists', () => {
      assert(isFunc(RadikoApi().getAreaId))
    })
    it('Area ID is JP13', function() {
      return RadikoApi().getAreaId().then( areaId => {
        assert("JP13" === areaId)
      });
    })
  });

  describe('Get stations list', function() {
    it('function exists', function() {
      assert(isFunc(RadikoApi().stations))
    });

    describe('response', function() {
      let response;
      it('response exists', function() {
        return RadikoApi().stations().then( res => {
          response = res;
          assert(res);
        });
      });
      it('station array exists', function() {
        assert('object' === typeof response.stations.station);
      });

      describe('station info (TBS)', function() {
        let tbs;
        it('data exists', function() {
          tbs = response.stations.station.filter( st => st.id === "TBS" )[0];
          assert(tbs);
        });
        describe('has key', () => {
          it('id',         () => assert(tbs.id));
          it('name',       () => assert(tbs.name));
          it('ascii_name', () => assert(tbs.ascii_name));
          it('areafree',   () => assert(tbs.areafree));
          it('timefree',   () => assert(tbs.timefree));
          it('logo',       () => assert(tbs.logo));
          it('banner',     () => assert(tbs.banner));
          it('href',       () => assert(tbs.href));
        });
      });
    });
  });

  describe('Get program info', () => {
    describe('#today', () => {
      it('function exists', () => assert(isFunc(RadikoApi().progs.today)))
      describe('response', () => {
        it('All stations', () => {
          return RadikoApi().progs.today().then( res => assert(res) );
        });
        it('Specific station (TBS)', () => {
          const stationId = "TBS";
          return RadikoApi().progs.today(stationId).then( res => assert(res) );
        });
      });
    });
    describe('#date', () => {
      it('function exists', () => assert(isFunc(RadikoApi().progs.date)))

      describe('response', () => {
        const today = (() => { // yyyymmdd as string
          const now = new Date();
          return now.getFullYear()
            + ('0' + (now.getMonth()+1)).slice(-2)
            + ('0' + (now.getDate())).slice(-2)
        })();

        it('All stations', () => {
          return RadikoApi().progs.date(today).then( res => assert(res) );
        });
        it('Specific station (TBS)', () => {
          const stationId = "TBS";
          return RadikoApi().progs.date(today, stationId).then( res => assert(res) );
        });
      });
    });
    describe('#now', () => {
      it('function exists', () => assert(isFunc(RadikoApi().progs.now)))
      it('response exists', () => {
        return RadikoApi().progs.now().then( res => assert(res) );
      });
    });
    describe('#weekly', () => {
      it('function exists', () => assert(isFunc(RadikoApi().progs.weekly)))
      it('response exists (TBS)', () => {
        const stationId = "TBS";
        return RadikoApi().progs.weekly(stationId).then( res => assert(res) );
      });
    });
  });
})
