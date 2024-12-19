/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com).
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

var utils = require("../lib/utils");

describe("utils", function () {
  describe("originalUrl", function () {
    it("can determine https from the connection encryption status", function () {
      var req = createVanillaRequest();

      expect(utils.originalURL(req)).to.equal("http://google.com/woot");

      req.connection.encrypted = true;

      expect(utils.originalURL(req)).to.equal("https://google.com/woot");
    });

    describe("can determine the host from the x-forwarded-host header", function () {
      it("with no options", function () {
        var req = createVanillaRequest();

        req.headers["x-forwarded-host"] = "yahoo.com";

        expect(utils.originalURL(req)).to.equal("http://google.com/woot");
      });

      it("with the proxy option", function () {
        var req = createVanillaRequest();

        req.headers["x-forwarded-host"] = "yahoo.com";

        expect(utils.originalURL(req, {})).to.equal("http://google.com/woot");
        expect(utils.originalURL(req, { proxy: false })).to.equal(
          "http://google.com/woot",
        );
        expect(utils.originalURL(req, { proxy: null })).to.equal(
          "http://google.com/woot",
        );
        expect(utils.originalURL(req, { proxy: true })).to.equal(
          "http://yahoo.com/woot",
        );
      });

      it("with an app object on the request", function () {
        var req = createVanillaRequest();

        req.app = {
          get: function (name) {
            if (name === "trust proxy") {
              return false;
            }
          },
        };

        req.headers["x-forwarded-host"] = "yahoo.com";

        expect(utils.originalURL(req)).to.equal("http://google.com/woot");
        expect(utils.originalURL(req, {})).to.equal("http://google.com/woot");
        expect(utils.originalURL(req, { proxy: false })).to.equal(
          "http://google.com/woot",
        );

        req.app = {
          get: function (name) {
            if (name === "trust proxy") {
              return true;
            }
          },
        };

        expect(utils.originalURL(req)).to.equal("http://yahoo.com/woot");
        expect(utils.originalURL(req), {}).to.equal("http://yahoo.com/woot");
        expect(utils.originalURL(req), { proxy: false }).to.equal(
          "http://yahoo.com/woot",
        );
        expect(utils.originalURL(req), { proxy: true }).to.equal(
          "http://yahoo.com/woot",
        );
      });
    });

    describe("can determine the protocol from the x-forwarded-proto header", function () {
      it("with no options", function () {
        var req = createVanillaRequest();

        req.headers["x-forwarded-proto"] = "http";

        expect(utils.originalURL(req)).to.equal("http://google.com/woot");

        req.headers["x-forwarded-proto"] = "https";

        expect(utils.originalURL(req)).to.equal("http://google.com/woot");
      });

      it("with the proxy option", function () {
        var req = createVanillaRequest();

        req.headers["x-forwarded-proto"] = "https";

        expect(utils.originalURL(req, {})).to.equal("http://google.com/woot");
        expect(utils.originalURL(req, { proxy: false })).to.equal(
          "http://google.com/woot",
        );
        expect(utils.originalURL(req, { proxy: null })).to.equal(
          "http://google.com/woot",
        );
        expect(utils.originalURL(req, { proxy: true })).to.equal(
          "https://google.com/woot",
        );
      });

      it("with an app object on the request", function () {
        var req = createVanillaRequest();

        req.app = {
          get: function (name) {
            if (name === "trust proxy") {
              return false;
            }
          },
        };

        req.headers["x-forwarded-proto"] = "https";

        expect(utils.originalURL(req)).to.equal("http://google.com/woot");
        expect(utils.originalURL(req, {})).to.equal("http://google.com/woot");
        expect(utils.originalURL(req, { proxy: false })).to.equal(
          "http://google.com/woot",
        );

        req.app = {
          get: function (name) {
            if (name === "trust proxy") {
              return true;
            }
          },
        };

        expect(utils.originalURL(req)).to.equal("https://google.com/woot");
        expect(utils.originalURL(req), {}).to.equal("https://google.com/woot");
        expect(utils.originalURL(req), { proxy: false }).to.equal(
          "https://google.com/woot",
        );
        expect(utils.originalURL(req), { proxy: true }).to.equal(
          "https://google.com/woot",
        );
      });
    });
  });
});

function createVanillaRequest() {
  return {
    headers: {
      host: "google.com",
    },
    connection: {
      encrypted: null,
    },
    url: "/woot",
  };
}
