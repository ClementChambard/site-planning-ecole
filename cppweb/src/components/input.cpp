#include "html/html.hpp"
#include <html/macros.hpp>

START_COMPONENT(Input)
DEF_PROP(name, STRING, true)
DEF_PROP(value, STRING, true)
DEF_PROP(disabled, BOOLEAN, true)
DEF_PROP(type, STRING, true)
DEF_PROP(label, STRING, false)
DEF_INTERFACE(Input, false, false)
DEF_BUILDFN(Input, params) {
  std::string name = params.take_a<std::string>("name");
  std::string value = params.take_a<std::string>("value");
  std::string type = params.take_a<std::string>("type", "text");
  std::string label = params.take_a<std::string>("label");
  bool disabled = params.take_a<bool>("disabled");

  std::vector<html::AttrForInsertion> attrs;
  attrs.push_back({"name", name});
  attrs.push_back({"value", value});
  attrs.push_back({"type", type});
  attrs.push_back({"class", "input-input transition"});
  if (disabled)
    attrs.push_back({"disabled", std::nullopt});

  return {html::html(
      "div", {{"class", "input-container"}},
      {html::html("input", std::move(attrs)),
       html::html("label", {{"class", "input-label"}, {"name", name}},
                  {label})})};
}
END_COMPONENT(Input)

START_COMPONENT(Checkbox)
DEF_PROP(name, STRING, false)
DEF_PROP(label, STRING, false)
DEF_PROP(checked, BOOLEAN, true)
DEF_INTERFACE(Checkbox, false, false)
DEF_BUILDFN(Checkbox, params) {
  std::string name = params.take_a<std::string>("name");
  std::string label = params.take_a<std::string>("label");
  bool checked = params.take_a<bool>("checked");

  std::vector<html::AttrForInsertion> attrs;
  attrs.push_back({"value", "1"});
  attrs.push_back({"name", name});
  attrs.push_back({"placeholder", " "});
  attrs.push_back({"type", "checkbox"});
  attrs.push_back({"class", "checkbox-box"});
  if (checked)
    attrs.push_back({"checked", std::nullopt});

  return {html::html(
      "div", {{"class", "checkbox-container"}},
      {html::html("label", {{"for", name}, {"class", "checkbox-text"}},
                  {label}),
       html::html("input", std::move(attrs))})};
}
END_COMPONENT(Checkbox)

START_COMPONENT(TimeInput)
DEF_PROP(hour_name, STRING, false)
DEF_PROP(minute_name, STRING, false)
DEF_PROP(label, STRING, false)
DEF_PROP(hour, STRING, true)
DEF_PROP(minute, STRING, true)
DEF_INTERFACE(TimeInput, false, false)
DEF_BUILDFN(TimeInput, params) {
  std::string hour_name = params.take_a<std::string>("hour_name");
  std::string minute_name = params.take_a<std::string>("minute_name");
  std::string hour = params.take_a<std::string>("hour");
  std::string minute = params.take_a<std::string>("minute");
  std::string label = params.take_a<std::string>("label");

  std::vector<html::AttrForInsertion> attrs_hour;
  attrs_hour.push_back({"name", hour_name});
  attrs_hour.push_back({"placeholder", "heure"});
  attrs_hour.push_back({"type", "number"});
  attrs_hour.push_back({"class", "transition text-input-input"});
  if (hour != "")
    attrs_hour.push_back({"value", hour});

  std::vector<html::AttrForInsertion> attrs_minute;
  attrs_minute.push_back({"name", minute_name});
  attrs_minute.push_back({"placeholder", "minute"});
  attrs_minute.push_back({"type", "number"});
  attrs_minute.push_back({"class", "transition text-input-input"});
  if (minute != "")
    attrs_minute.push_back({"value", minute});

  // clang-format off
  return {
    html::html("div", {{"class", "checkbox-container"}}, {
      html::html("div", {{"class", "checkgox-text"}}, {label}),
      html::html("div", {{"class", "text-input-right"}}, {
        html::html("div", {{"class", "text-input-sub-container"}}, {
          html::html("input", std::move(attrs_hour)),
        }),
        html::html("div", {{"class", "text-md px-4"}}, {"h"}),
        html::html("div", {{"class", "text-input-sub-container"}}, {
          html::html("input", std::move(attrs_minute)),
        }),
      })
    })
  };
}
END_COMPONENT(TimeInput)
