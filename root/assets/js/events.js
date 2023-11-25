// https://single-spa.js.org/docs/api/

let appNames = [];

System.import("single-spa-layout").then((singleSpaLayout) => {
  const { constructRoutes, constructApplications } = singleSpaLayout;
  const routes = constructRoutes(document.querySelector("#single-spa-layout"))
    .routes[0].routes[1];
  appNames = constructApplications({
    routes,
    loadApp({ name }) {
      return name;
    },
  }).map((m) => m.name);

  window.addEventListener("single-spa:before-app-change", (evt) => {
    spinner.show();
  });

  window.addEventListener("single-spa:app-change", (evt) => {
    if (appNames.some((s) => evt.detail.appsByNewStatus.MOUNTED.includes(s))) {
    console.warn('evt', evt);
      spinner.hide();
    }
  });
});
