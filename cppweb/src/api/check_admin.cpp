#include "api/context.hpp"
#include <api/builder.hpp>

auto CA_ROUTE = api::Endpoint()
                    .post("/",
                          [](api::Context &c) {
                            auto mdp = c.request_body["password"].asString();
                            if (mdp == "") {
                              return c.error(400);
                            }
                            if (mdp == "MamanQueJ'Aime") {
                              c.res.header("location", "/admin/sondages")
                                  .set_cookie({.name = "sessionId",
                                               .value = "abc123",
                                               .path = "/"});
                              return c.ok(303);
                            } else {
                              return c.error(401);
                            }
                          })
                    .register_at_root("/check_admin");

bool is_authentified(api::Context &c) {
  auto session_id = c.get_cookie("sessionId");
  if (session_id == std::nullopt)
    return c.error(401);
  if (*session_id != "abc123")
    return c.error(401);
  return c.ok();
}

bool authentify(api::Context &c) {
  auto session_id = c.get_cookie("sessionId");
  if (session_id == std::nullopt)
    return c.ok();
  if (*session_id != "abc123")
    return c.ok();
  c.set_data("auth", true);
  return c.ok();
}
