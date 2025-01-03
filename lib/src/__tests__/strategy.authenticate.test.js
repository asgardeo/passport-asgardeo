/**
 * Copyright (c) {{year}}, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var chai = require("chai");
var Strategy = require("../lib/strategy");
var uri = require("url");

describe("Strategy", function () {
  describe("#authenticate", function () {
    it("should redirect with redirect URI", function (done) {
      var strategy = new Strategy(
        {
          issuer: "https://server.example.com",
          authorizationURL: "https://server.example.com/authorize",
          tokenURL: "https://server.example.com/token",
          clientID: "s6BhdRkqt3",
          clientSecret: "some_secret12345",
          callbackURL: "https://client.example.org/cb",
        },
        function () {},
      );

      chai.passport
        .use(strategy)
        .request(function (req) {
          req.session = {};
        })
        .redirect(function (url) {
          var l = uri.parse(url, true);
          var state = l.query.state;

          expect(url).to.equal(
            "https://server.example.com/authorize?response_type=code&client_id=s6BhdRkqt3&redirect_uri=https%3A%2F%2Fclient.example.org%2Fcb2&scope=openid&state=" +
              encodeURIComponent(state),
          );
          expect(state).to.have.length(24);
          expect(
            this.session["openidconnect:server.example.com"],
          ).to.deep.equal({
            state: {
              handle: state,
            },
          });
          done();
        })
        .error(done)
        .authenticate({ callbackURL: "https://client.example.org/cb2" });
    }); // should redirect with redirect URI

    it("should redirect with scope as array", function (done) {
      var strategy = new Strategy(
        {
          issuer: "https://server.example.com",
          authorizationURL: "https://server.example.com/authorize",
          tokenURL: "https://server.example.com/token",
          clientID: "s6BhdRkqt3",
          clientSecret: "some_secret12345",
          callbackURL: "https://client.example.org/cb",
        },
        function () {},
      );

      chai.passport
        .use(strategy)
        .request(function (req) {
          req.session = {};
        })
        .redirect(function (url) {
          var l = uri.parse(url, true);
          var state = l.query.state;

          expect(url).to.equal(
            "https://server.example.com/authorize?response_type=code&client_id=s6BhdRkqt3&redirect_uri=https%3A%2F%2Fclient.example.org%2Fcb&scope=openid%20profile%20email&state=" +
              encodeURIComponent(state),
          );
          expect(state).to.have.length(24);
          expect(
            this.session["openidconnect:server.example.com"],
          ).to.deep.equal({
            state: {
              handle: state,
            },
          });
          done();
        })
        .error(done)
        .authenticate({ scope: ["profile", "email"] });
    }); // should redirect with scope as array

    it("should redirect with scope as string", function (done) {
      var strategy = new Strategy(
        {
          issuer: "https://server.example.com",
          authorizationURL: "https://server.example.com/authorize",
          tokenURL: "https://server.example.com/token",
          clientID: "s6BhdRkqt3",
          clientSecret: "some_secret12345",
          callbackURL: "https://client.example.org/cb",
        },
        function () {},
      );

      chai.passport
        .use(strategy)
        .request(function (req) {
          req.session = {};
        })
        .redirect(function (url) {
          var l = uri.parse(url, true);
          var state = l.query.state;

          expect(url).to.equal(
            "https://server.example.com/authorize?response_type=code&client_id=s6BhdRkqt3&redirect_uri=https%3A%2F%2Fclient.example.org%2Fcb&scope=openid%20profile%20email&state=" +
              encodeURIComponent(state),
          );
          expect(state).to.have.length(24);
          expect(
            this.session["openidconnect:server.example.com"],
          ).to.deep.equal({
            state: {
              handle: state,
            },
          });
          done();
        })
        .error(done)
        .authenticate({ scope: "profile email" });
    }); // should redirect with scope as string

    it("should redirect with prompt parameter", function (done) {
      var strategy = new Strategy(
        {
          issuer: "https://server.example.com",
          authorizationURL: "https://server.example.com/authorize",
          tokenURL: "https://server.example.com/token",
          clientID: "s6BhdRkqt3",
          clientSecret: "some_secret12345",
          callbackURL: "https://client.example.org/cb",
        },
        function () {},
      );

      chai.passport
        .use(strategy)
        .request(function (req) {
          req.session = {};
        })
        .redirect(function (url) {
          var l = uri.parse(url, true);
          var state = l.query.state;

          expect(url).to.equal(
            "https://server.example.com/authorize?response_type=code&client_id=s6BhdRkqt3&redirect_uri=https%3A%2F%2Fclient.example.org%2Fcb&scope=openid&prompt=login&state=" +
              encodeURIComponent(state),
          );
          expect(state).to.have.length(24);
          expect(
            this.session["openidconnect:server.example.com"],
          ).to.deep.equal({
            state: {
              handle: state,
            },
          });
          done();
        })
        .error(done)
        .authenticate({ prompt: "login" });
    }); // should redirect with prompt parameter

    it("should redirect with display parameter", function (done) {
      var strategy = new Strategy(
        {
          issuer: "https://server.example.com",
          authorizationURL: "https://server.example.com/authorize",
          tokenURL: "https://server.example.com/token",
          clientID: "s6BhdRkqt3",
          clientSecret: "some_secret12345",
          callbackURL: "https://client.example.org/cb",
        },
        function () {},
      );

      chai.passport
        .use(strategy)
        .request(function (req) {
          req.session = {};
        })
        .redirect(function (url) {
          var l = uri.parse(url, true);
          var state = l.query.state;

          expect(url).to.equal(
            "https://server.example.com/authorize?response_type=code&client_id=s6BhdRkqt3&redirect_uri=https%3A%2F%2Fclient.example.org%2Fcb&scope=openid&display=touch&state=" +
              encodeURIComponent(state),
          );
          expect(state).to.have.length(24);
          expect(
            this.session["openidconnect:server.example.com"],
          ).to.deep.equal({
            state: {
              handle: state,
            },
          });
          done();
        })
        .error(done)
        .authenticate({ display: "touch" });
    }); // should redirect with display parameter

    it("should redirect with login hint parameter", function (done) {
      var strategy = new Strategy(
        {
          issuer: "https://server.example.com",
          authorizationURL: "https://server.example.com/authorize",
          tokenURL: "https://server.example.com/token",
          clientID: "s6BhdRkqt3",
          clientSecret: "some_secret12345",
          callbackURL: "https://client.example.org/cb",
        },
        function () {},
      );

      chai.passport
        .use(strategy)
        .request(function (req) {
          req.session = {};
        })
        .redirect(function (url) {
          var l = uri.parse(url, true);
          var state = l.query.state;

          expect(url).to.equal(
            "https://server.example.com/authorize?response_type=code&client_id=s6BhdRkqt3&redirect_uri=https%3A%2F%2Fclient.example.org%2Fcb&scope=openid&login_hint=janedoe%40example.com&state=" +
              encodeURIComponent(state),
          );
          expect(state).to.have.length(24);
          expect(
            this.session["openidconnect:server.example.com"],
          ).to.deep.equal({
            state: {
              handle: state,
            },
          });
          done();
        })
        .error(done)
        .authenticate({ loginHint: "janedoe@example.com" });
    }); // should redirect with login hint parameter

    it("should redirect with application-supplied state", function (done) {
      var strategy = new Strategy(
        {
          issuer: "https://server.example.com",
          authorizationURL: "https://server.example.com/authorize",
          tokenURL: "https://server.example.com/token",
          clientID: "s6BhdRkqt3",
          clientSecret: "some_secret12345",
          callbackURL: "https://client.example.org/cb",
        },
        function () {},
      );

      chai.passport
        .use(strategy)
        .request(function (req) {
          req.session = {};
        })
        .redirect(function (url) {
          var l = uri.parse(url, true);
          var state = l.query.state;

          expect(url).to.equal(
            "https://server.example.com/authorize?response_type=code&client_id=s6BhdRkqt3&redirect_uri=https%3A%2F%2Fclient.example.org%2Fcb&scope=openid&state=" +
              encodeURIComponent(state),
          );
          expect(state).to.have.length(24);
          expect(
            this.session["openidconnect:server.example.com"].state,
          ).to.deep.equal({
            handle: state,
            state: { returnTo: "https://client.example.org/app" },
          });
          done();
        })
        .error(done)
        .authenticate({
          state: { returnTo: "https://client.example.org/app" },
        });
    }); // should redirect with application-supplied state
  }); // #authenticate
}); // Strategy
