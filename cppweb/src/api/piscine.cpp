#include "../db/db.hpp"
#include "is_authentified.hpp"
#include <api/builder.hpp>

auto PISCINEEP =
    api::Endpoint()

        .get("/",
             [](api::Context &c) {
               Json::Value out{Json::ValueType::arrayValue};
               ITER_DB(s, id, PiscineDb) {
                 Json::Value o{Json::ValueType::objectValue};
                 o["id"] = s->id;
                 o["date"] = s->date;
                 o["parent"] = s->parent;
                 out.append(o);
               }
               c.res.json(out);
               return c.ok();
             })

        .put("/:id", authentify,
             [](api::Context &c) {
               bool auth = c.get_data<bool>("auth");
               auto const &body = c.request_body;

               PiscineDb::lock();
               auto piscine =
                   PiscineDb::get().get_id(std::stoi(c.route_params["id"]));
               if (!piscine) {
                 PiscineDb::unlock();
                 return c.error(404);
               }
               if (auth || piscine->parent == "") {
                 if (body.isMember("parent"))
                   piscine->parent = body["parent"].asString();
               }
               if (auth) {
                 if (body.isMember("date"))
                   piscine->date = body["date"].asString();
               }
               PiscineDb::get().write();
               PiscineDb::unlock();
               return c.ok();
             })
        .post(
            "/", is_authentified,
            [](api::Context &c) {
              Json::Value o{Json::ValueType::objectValue};
              auto const &body = c.request_body;

              PiscineDb::lock();
              auto &piscine = PiscineDb::get().add_new();
              o["id"] = piscine.id;
              o["date"] = piscine.date = body["date"].asString();
              o["parent"] = piscine.parent = "";
              PiscineDb::get().write();
              PiscineDb::unlock();
              c.res.json(o);
              c.res.header(
                  "Location",
                  (std::string("/api/piscine/") + o["id"].asString()).c_str());
              return c.ok(201);
            })

        .del("/:id", is_authentified,
             [](api::Context &c) {
               PiscineDb::lock();
               bool ok =
                   PiscineDb::get().del_id(std::stoi(c.route_params["id"]));
               PiscineDb::get().write();
               PiscineDb::unlock();
               if (!ok)
                 return c.error(404);
               return c.ok();
             })

        .register_at_root("/piscine");
