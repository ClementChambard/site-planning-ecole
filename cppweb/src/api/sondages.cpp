#include "../db/db.hpp"
#include "api/context.hpp"
#include "is_authentified.hpp"
#include <api/builder.hpp>
#include <string>

auto SONDAGE_EP =
    api::Endpoint()
        .get("/",
             [](api::Context &c) {
               Json::Value out{Json::ValueType::arrayValue};
               ITER_DB(s, id, SondagesDb) {
                 Json::Value o{Json::ValueType::objectValue};
                 o["id"] = s->id;
                 o["active"] = s->active;
                 o["name"] = s->name;
                 o["desc"] = s->desc;
                 o["route"] = s->route;
                 o["btn_text"] = s->button_text;
                 out.append(o);
               }
               c.res.json(out);
               return c.ok();
             })
        .put("/:id", is_authentified,
             [](api::Context &c) {
               SondagesDb::lock();
               auto sondage =
                   SondagesDb::get().get_id(std::stoi(c.route_params["id"]));
               if (!sondage) {
                 SondagesDb::unlock();
                 return c.error(404);
               }
               auto &body = c.request_body;
               if (body.isMember("active"))
                 sondage->active = body["active"].asBool();
               if (body.isMember("name"))
                 sondage->name = body["name"].asString();
               if (body.isMember("btn_text"))
                 sondage->button_text = body["btn_text"].asString();
               if (body.isMember("desc"))
                 sondage->desc = body["desc"].asString();
               if (body.isMember("route"))
                 sondage->route = body["route"].asString();
               SondagesDb::get().write();
               SondagesDb::unlock();
               return c.ok();
             })
        .register_at_root("/sondages");
