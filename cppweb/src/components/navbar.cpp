#include "html/html.hpp"
#include <html/macros.hpp>
#include <optional>

START_COMPONENT(Navbar)
DEF_INTERFACE(Navbar, false, false)
DEF_BUILDFN(Navbar, ) {
  // clang-format off

  auto fgt = 
    html::component("Modal", {
        {"popover_id", "admin-password-modal"},
        {"title", ""},
        {"action_label", "Confirmer"},
        {"onclick", "try_authentify()"}
    }, {
      html::html("div", {}, {
        html::component("Input", {
          {"label", "Password"},
          {"name", "password"},
          {"type", "password"}
        })
      })
    });
  fgt.push_back(
    html::html("div", {{"class", "navbar-container"}}, {
      html::html("div", {{"class", "navbar-left"}}, {
        html::html("div", {{"class", "navbar-left-icon"}}, {}, {}),
        html::html("a", {{"class", "navbar-left-text"}, {"href", "/"}}, {
          "Site de Mme Chambard"
        })
      }),
      html::html("div", {{"class", "navbar-right"}}, {
        html::html("button", {
            {"class", "navbar-menu-item"},
          {"popovertarget", "admin-password-modal"}
        }, {"Admin"})
      }),
      html::component("NavbarMenu", {}, {
        html::html("button", {
            {"class", "navbar-menu-item"},
          {"popovertarget", "admin-password-modal"}
        }, {"Admin"})
      })
    })
  );

  return fgt;
}
END_COMPONENT(Navbar)

START_COMPONENT(NavbarMenu)
DEF_INTERFACE(NavbarMenu, true, false)
DEF_BUILDFN(NavbarMenu, params) {
  return {
    html::html("div", {{"class", "navbar-menu"}}, {
      html::html("button", {{"class", "navbar-menu-button"}, {"popovertarget", "navbar-dropdown"}}, {
        html::component("Icon", {{"size", "24"}, {"icon", "menu"}})
      }),
      html::html("div", {{"popover", std::nullopt}, {"id", "navbar-dropdown"}, {"class", "navbar-dropdown transition"}}, {
        html::html("div", {{"class", "navbar-dropdown-container"}}, {
            params.inner_html
            })
      })
    })
  };
}
END_COMPONENT(NavbarMenu)
