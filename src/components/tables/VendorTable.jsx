// @flow

import React, { useState, useEffect } from "react";
import { useFetch } from "apis/crud";
import { EditOperationCell } from "components/pureComponents/TableCells";
import { uniqueKey } from "apis/utils";
import { setLoading, setError } from "actions/appState";
import { Table, Drawer, Tag, Button, Modal } from "antd";
import VendorForm from "components/forms/VendorForm";
import ContactForm from "components/forms/ContactForm";
import TableToolbar from "components/pureComponents/TableToolbar";
import ContactTable from "components/tables/ContactTable";
import { useTranslation } from "react-i18next";
import R from "ramda";
import axios from "axios";
import qs from "qs";
const vendorTable = (props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [tableData, remove, update] = useFetch("vendors");
  const [isShowVendorForm, setShowVendorForm] = useState(false);
  const [isShowContactForm, setShowContactForm] = useState(false);
  const [editingVendor, setEditingVendor] = useState({});
  const [showContact, setShowContact] = useState(false);
  const [deleteWarning, setDeleteWarning] = useState({
    show: false,
    groups: [],
  });
  const { t } = useTranslation();

  const onEditing = (record) => {
    setEditingVendor(record);
    setShowVendorForm(true);
  };

  const onEditingContact = (record) => {
    setEditingVendor(record);
    setShowContactForm(true);
  };

  const onSubmit = (vendor) => {
    const newData = R.omit(["_id"], vendor);
    update(newData);
    setShowVendorForm(false);
    setShowContactForm(false);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectKeys) => setSelectedRowKeys(selectKeys),
  };

  const addDefaultVendor = () => {
    const key = uniqueKey("vendor");
    onEditing({
      key: key,
      name: "",
      phone: "",
      email: "",
      contacts: [],
    });
  };

  const checkRemove = (body) => {
    axios
      .get("/apis/v1/read/devices", {
        params: { vendorkey: body },
        paramsSerializer: (params) => {
          return qs.stringify(params, { indices: false });
        },
      })
      .then((res) => {
        const groups = res.data || [];
        if (groups.length > 0) {
          setDeleteWarning({ show: true, groups });
        }
      })

      .catch((err) => {
        if (err.response) {
          remove(body);
        }
      });
  };

  const handleModalOK = (e) => {
    setDeleteWarning({ groups: [], show: false });
  };

  const handleDetail = (r) => {
    setEditingVendor(r);
    setShowContact(true);
  };
  const columns = [
    {
      title: t("name"),
      dataIndex: "name",
      key: "name",
    },

    {
      title: t("phone"),
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: t("fax"),
      dataIndex: "fax",
      key: "fax",
    },

    {
      title: t("email"),
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      onCell: (record) => ({
        style: { paddingTop: 0, paddingBottom: 0 },
      }),
      render: (text, record) => (
        <EditOperationCell
          handlerSetEditing={onEditing}
          record={record}
          handleDetail={handleDetail}
        />
      ),
    },
  ];

  return (
    <div>
      <Drawer
        title={t("vendor.editVendor")}
        visible={isShowVendorForm}
        placement="bottom"
        footer={null}
        height="80%"
        onClose={() => setShowVendorForm(false)}
      >
        {false && (
          <Button type="primary" className="my-2" onClick={onEditingContact}>
            {t("vendor.editContact")}
          </Button>
        )}
        <VendorForm doSubmit={onEditingContact} vendor={editingVendor} />
      </Drawer>
      <Drawer
        title={t("vendor.editContact")}
        visible={isShowContactForm}
        placement="bottom"
        footer={null}
        destroyOnClose={true}
        height="75%"
        onClose={() => setShowContactForm(false)}
      >
        <ContactForm
          doSubmit={onSubmit}
          vendor={editingVendor}
          onClose={() => setShowContact(false)}
          showButton={false}
        />
      </Drawer>
      <TableToolbar
        title={t("vendor.name")}
        selectedRowKeys={selectedRowKeys}
        handlers={{
          addItem: addDefaultVendor,
          removeSelectedItems: checkRemove,
          // onSearch: searchUser
        }}
        componentsText={{
          add: t("vendor.add"),
          remove: t("vendor.remove"),
        }}
      />
      <Modal
        visible={deleteWarning.show}
        title={t("error.deleteVendorTitle")}
        onOk={handleModalOK}
        onCancel={handleModalOK}
      >
        <p>{t("error.deleteVendor")}</p>
        <ul>
          {deleteWarning.groups.map((group) => (
            <li key={group.key}>{group.name}</li>
          ))}
        </ul>
      </Modal>
      <Table
        size="small"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={tableData}
      />
      {showContact ? (
        <ContactForm
          doSubmit={onSubmit}
          vendor={editingVendor}
          onClose={() => setShowContact(false)}
          showButton={true}
        />
      ) : null}
    </div>
  );
};

export default vendorTable;
