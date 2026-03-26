#include "../db/db.hpp"
#include "is_authentified.hpp"
#include <api/builder.hpp>

auto ROLLEREP =
    api::Endpoint()

        .get("/",
             [](api::Context &c) {
               Json::Value out{Json::ValueType::arrayValue};
               ITER_DB(s, id, RollersDb) {
                 Json::Value o{Json::ValueType::objectValue};
                 o["id"] = s->id;
                 o["eleve"] = s->eleve;
                 o["size"] = s->size;
                 o["has_roller"] = s->has_roller;
                 o["has_helmet"] = s->has_helmet;
                 o["has_protect"] = s->has_protect;
                 o["has_answered"] = s->has_answered;
                 out.append(o);
               }
               c.res.json(out);
               return c.ok();
             })

        .put("/:id", authentify,
             [](api::Context &c) {
               bool auth = c.get_data<bool>("auth");
               auto const &body = c.request_body;
               RollersDb::lock();
               auto roller =
                   RollersDb::get().get_id(std::stoi(c.route_params["id"]));
               if (!roller) {
                 RollersDb::unlock();
                 return c.error(404);
               }
               if (auth) {
                 if (body.isMember("eleve"))
                   roller->eleve = body["eleve"].asString();
               }
               if (body.isMember("size"))
                 roller->size = body["size"].asInt();
               if (body.isMember("has_protect"))
                 roller->has_protect = body["has_protect"].asBool();
               if (body.isMember("has_helmet"))
                 roller->has_helmet = body["has_helmet"].asBool();
               if (body.isMember("has_roller"))
                 roller->has_roller = body["has_roller"].asBool();
               if (body.isMember("has_answered"))
                 roller->has_answered = body["has_answered"].asBool();
               RollersDb::get().write();
               RollersDb::unlock();
               return c.ok();
             })
        .post(
            "/", is_authentified,
            [](api::Context &c) {
              Json::Value o{Json::ValueType::objectValue};
              auto const &body = c.request_body;

              RollersDb::lock();
              auto &roller = RollersDb::get().add_new();
              o["id"] = roller.id;
              o["eleve"] = roller.eleve = body["eleve"].asString();
              o["size"] = roller.size = 0;
              o["has_protect"] = roller.has_protect = false;
              o["has_helmet"] = roller.has_helmet = false;
              o["has_roller"] = roller.has_roller = false;
              o["has_answered"] = roller.has_answered = false;
              RollersDb::get().write();
              RollersDb::unlock();
              c.res.json(o);
              c.res.header(
                  "Location",
                  (std::string("/api/rollers/") + o["id"].asString()).c_str());
              return c.ok(201);
            })

        .del("/:id", is_authentified,
             [](api::Context &c) {
               RollersDb::lock();
               bool ok =
                   RollersDb::get().del_id(std::stoi(c.route_params["id"]));
               RollersDb::get().write();
               RollersDb::unlock();
               if (!ok)
                 return c.error(404);
               return c.ok();
             })
        .register_at_root("/rollers");
