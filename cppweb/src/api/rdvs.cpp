#include "../db/db.hpp"
#include "api/context.hpp"
#include "is_authentified.hpp"
#include <api/builder.hpp>

auto RDVSEP =
    api::Endpoint()
        .get("/",
             [](api::Context &c) {
               Json::Value out{Json::ValueType::arrayValue};
               ITER_DB(s, id, RdvsDb) {
                 Json::Value o{Json::ValueType::objectValue};
                 o["id"] = s->id;
                 o["eleve"] = s->eleve;
                 o["minute"] = s->minute;
                 o["heure"] = s->heure;
                 o["txt"] = s->txt;
                 out.append(o);
               }
               c.res.json(out);
               return c.ok();
             })
        .put("/:id", authentify,
             [](api::Context &c) {
               bool auth = c.get_data<bool>("auth");
               auto &body = c.request_body;

               RdvsDb::lock();
               auto rdv = RdvsDb::get().get_id(std::stoi(c.route_params["id"]));
               if (!rdv) {
                 RdvsDb::unlock();
                 return c.error(404);
               }
               if (auth) {
                 if (body.isMember("heure"))
                   rdv->heure = body["heure"].asInt();
                 if (body.isMember("minute"))
                   rdv->minute = body["minute"].asInt();
                 if (body.isMember("txt"))
                   rdv->txt = body["txt"].asString();
               }
               if (auth || rdv->eleve == "") {
                 if (body.isMember("eleve"))
                   rdv->eleve = body["eleve"].asString();
               }
               RdvsDb::get().write();
               RdvsDb::unlock();
               return c.ok();
             })
        .post("/", is_authentified,
              [](api::Context &c) {
                Json::Value o{Json::ValueType::objectValue};
                auto &body = c.request_body;

                RdvsDb::lock();
                auto &rdv = RdvsDb::get().add_new();
                o["id"] = rdv.id;
                o["heure"] = rdv.heure = body["heure"].asInt();
                o["minute"] = rdv.minute = body["minute"].asInt();
                o["eleve"] = rdv.eleve = "";
                o["txt"] = rdv.txt = body["txt"].asString();
                RdvsDb::get().write();
                RdvsDb::unlock();
                c.res.json(o);
                c.res.header(
                    "Location",
                    (std::string("/api/rdvs/") + o["id"].asString()).c_str());
                return c.ok(201);
              })
        .del("/:id", is_authentified,
             [](api::Context &c) {
               RdvsDb::lock();
               bool ok = RdvsDb::get().del_id(std::stoi(c.route_params["id"]));
               RdvsDb::get().write();
               RdvsDb::unlock();
               if (!ok)
                 return c.error(404);
               return c.ok();
             })
        .register_at_root("/rdvs");
