#include <html/macros.hpp>

START_COMPONENT(Heading)
DEF_PROP(center, BOOLEAN, true)
DEF_PROP(title, STRING, false)
DEF_PROP(subtitle, STRING, false)
DEF_INTERFACE(Heading, false, false)
DEF_BUILDFN(Heading, params) {
  std::string title = params.take_a<std::string>("title");
  std::string subtitle = params.take_a<std::string>("subtitle");
  bool center = params.take_a<bool>("center");
  std::string style = center ? "text-align: center;" : "text-align: start;";

  return {html::html(
      "div", {{"style", style}},
      {html::html("div", {{"class", "heading-title"}}, {title}),
       html::html("div", {{"class", "heading-subtitle"}}, {subtitle})})};
}
END_COMPONENT(Heading)
