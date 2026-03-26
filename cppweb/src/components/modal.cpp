#include "html/html.hpp"
#include <html/macros.hpp>

START_COMPONENT(Modal)
DEF_PROP(popover_id, STRING, false)
DEF_PROP(title, STRING, false)
DEF_PROP(action_2nd_label, STRING, true)
DEF_PROP(handleSecondaryAction, STRING, true)
DEF_PROP(onclick, STRING, false)
DEF_PROP(action_label, STRING, false)
DEF_PROP(footer, STRING, true)
DEF_INTERFACE(Modal, true, false)
DEF_BUILDFN(Modal, params) {
  std::string popover_id = params.take_a<std::string>("popover_id");
  std::string title = params.take_a<std::string>("title");
  std::string action_2nd_label = params.take_a<std::string>("action_2nd_label");
  std::string handleSecondaryAction =
      params.take_a<std::string>("handleSecondaryAction");
  std::string onclick = params.take_a<std::string>("onclick");
  std::string action_label = params.take_a<std::string>("action_label");
  std::string footer = params.take_a<std::string>("footer");

  html::Fragment modal_buttons = {};

  if (action_2nd_label != "") {
    modal_buttons.push_back(
        html::html("button",
                   {{"class", "btn-component transition outline"},
                    {"onclick", handleSecondaryAction}},
                   {action_2nd_label}));
  }

  modal_buttons.push_back(html::html(
      "button", {{"class", "btn-component transition"}, {"onclick", onclick}},
      {action_label}));

  html::Fragment footer_html = {
      html::html("div", {{"class", "modal-buttons"}}, {modal_buttons}),
  };
  if (footer != "")
    footer_html.push_back(footer);

  // clang-format off
  return {
    html::html("div", {{"class", "modal-popover"}, {"popover", std::nullopt}, {"id", popover_id}}, {
      html::html("div", {{"class", "modal-container"}}, {
        html::html("div", {{"class", "modal-transition"}}, {
          html::html("div", {{"class", "modal-box"}}, {
            html::html("div", {{"class", "modal-header"}}, {
              html::html("button", {{"popovertarget", popover_id}, {"class", "modal-close transition"}}, {
                html::component("Icon", {{"size", "18"}, {"icon", "close"}})
              }),
              html::html("div", {{"class", "modal-title"}}, {title})
            }),
            html::html("div", {{"class", "modal-body"}}, {
              params.inner_html
            }),
            html::html("div", {{"class", "modal-footer"}}, {
              footer_html
            })
          })
        })
      })
    })
  };
}
END_COMPONENT(Modal)

