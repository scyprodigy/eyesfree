// @flow
import React, { useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { connect } from "react-redux";
import { Button } from "antd";
import * as yup from "yup";
import R from "ramda";
import ErrorTip from "./ErrorTip";
import { loadingState, username } from "reducers/storeUtils";
import { updatePasssword } from "actions/auth";
import { useTranslation } from "react-i18next";

const validator = yup.object().shape({
  oripassword: yup.string(),
  newpassword: yup.string().required("請輸入密碼"),
  validnewpassword: yup
    .string()
    .test("valid-password", "輸入密碼不相同", function (value) {
      const newpw = this.parent.newpassword;
      return value === newpw;
    }),
});

type typeProps = {
  loading: boolean,
  sendRequest: Function,
  account: string,
};

const resetPasswordForm = (props: typeProps) => {
  const { loading, updatePassword, account } = props;
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={{
        newpassword: "",
        validnewpassword: "",
        passwordtip: "",
      }}
      validationSchema={validator}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        updatePassword(values);
      }}
      render={({ errors, isValid }) => (
        <Form className="container_col">
          <span>{account}</span>

          <label htmlFor="newpassword">{t("newPassword")} </label>
          <Field name="newpassword" type="password" />
          <ErrorMessage name="newpassword" component={ErrorTip} />
          <label htmlFor="validnewpassword">{t("validPassword")} </label>
          <Field name="validnewpassword" type="password" />
          <ErrorMessage name="validnewpassword" component={ErrorTip} />
          <label htmlFor="passwordtip">{t("passwordTip")} </label>
          <Field name="passwordtip" type="passwordtip" />
          <ErrorMessage name="passwordtip" component={ErrorTip} />
          <Button
            className="center"
            htmlType="submit"
            disabled={!isValid}
            style={{ marginTop: "8px" }}
            loading={loading}
          >
            送出
          </Button>
        </Form>
      )}
    />
  );
};

const mapState2Props = (state) => ({
  account: username(state),
  loading: loadingState(state),
});

const mapDispatch2Props = (dispatch) => ({
  updatePassword: (password) => dispatch(updatePasssword(password)),
});

export default connect(mapState2Props, mapDispatch2Props)(resetPasswordForm);
