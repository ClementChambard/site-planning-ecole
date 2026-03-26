#include <html/macros.hpp>

START_COMPONENT(Icon)
DEF_PROP(size, STRING, false)
DEF_PROP(class, STRING, true)
DEF_PROP(icon, STRING, false)
DEF_INTERFACE(Icon, false, false)
DEF_BUILDFN(Icon, params) {
  std::string size = params.take_a<std::string>("size");
  std::string icon = params.take_a<std::string>("icon");
  return {html::html(
      "span",
      {{"style", "font-size:" + size + "px;font-family:material-icons;"}},
      params.gather_remaining_attrs(), {icon})};
}
END_COMPONENT(Icon)
