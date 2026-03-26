
#include <html/macros.hpp>

START_SERVER_COMPONENT(AuthRedirect)
DEF_INTERFACE(AuthRedirect, false, false)
DEF_SERVER_EXEC(AuthRedirect, ctx, , ) {
  auto sessionId = ctx.get_cookie("sessionId");
  if (sessionId == std::nullopt || *sessionId != "abc123") {
    ctx.redirect("/");
  }
  return "";
}
END_COMPONENT(AuthRedirect)
