import React from "react";

import { useTranslation } from "react-i18next";

import { Table } from "antd";
import R from "ramda";

const licenseMessage = ({ lic }) => {
  const { t } = useTranslation();

  const columns = [
    {
      title: t("licenseMessage.expire"),
      dataIndex: "expire",
      key: "expire",
    },
    {
      title: t("licenseMessage.count"),
      dataIndex: "count",
      key: "count",
    },
  ];

  return (
    <div className="card p-2">
      <h5 className="card-title"> {t("licenseMessage.title")} </h5>
      <h6 className="card-text">
        {t("licenseMessage.company")} : {R.path(["information", "owner"], lic)}
      </h6>

      <Table
        dataSource={R.path(["information", "licenses"], lic)}
        columns={columns}
      />
      <p className="card-text">
        {t("licenseMessage.contact")} :{" "}
        {R.path(["information", "contact"], lic)}
      </p>
    </div>
  );
};

export default licenseMessage;
