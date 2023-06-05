module.exports = [
  {
    label: "准备",
    type: "doc",
    id: 'developer-guide/index',
  },
  {
    collapsible: false,
    label: "服务部署",
    type: "category",
    items: [
      "developer-guide/docker-deploy",
      "developer-guide/source-deploy",
    ],
  }, {
    collapsible: false,
    label: "云服务商",
    type: "category",
    items: [
      "developer-guide/railway",
    ],
  }, {
    collapsible: false,
    label: "自动化打包",
    type: "category",
    items: [
      "developer-guide/fastlane",
    ],
  },{
    collapsible: false,
    label: "增量更新",
    type: "category",
    items: [
      "developer-guide/android-sdk",
      "developer-guide/flutter-sdk",
      "developer-guide/rn-sdk",
    ],
  },
];
