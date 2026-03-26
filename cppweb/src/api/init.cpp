#include "../db/db.hpp"
#include <api/api.hpp>

api::Api *API;

SondagesDb *sondages_db;
RollersDb *rollers_db;
RdvsDb *rdvs_db;
PiscineDb *piscine_db;

extern "C" api::Api *get_api() {
  if (API == nullptr)
    API = new api::Api;
  return API;
}

extern "C" void init_api() {
  sondages_db = new SondagesDb("private/sondages.db");
  rollers_db = new RollersDb("private/rollers.db");
  rdvs_db = new RdvsDb("private/rdvs.db");
  piscine_db = new PiscineDb("private/piscine.db");
}

extern "C" void delete_api() {
  delete API;
  API = nullptr;
}
