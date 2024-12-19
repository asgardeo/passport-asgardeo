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

exports.parse = function (json) {
  var profile = {};
  profile.id = json.sub;
  // Prior to OpenID Connect Basic Client Profile 1.0 - draft 22, the "sub"
  // claim was named "user_id".  Many providers still use the old name, so
  // fallback to that.
  if (!profile.id) {
    profile.id = json.user_id;
  }

  if (json.name) {
    profile.displayName = json.name;
  }
  if (json.preferred_username) {
    profile.username = json.preferred_username;
  }
  if (json.family_name || json.given_name || json.middle_name) {
    profile.name = {};
    if (json.family_name) {
      profile.name.familyName = json.family_name;
    }
    if (json.given_name) {
      profile.name.givenName = json.given_name;
    }
    if (json.middle_name) {
      profile.name.middleName = json.middle_name;
    }
  }
  if (json.email) {
    profile.emails = [{value: json.email}];
  }

  return profile;
};
