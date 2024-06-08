import React from "react";
import { request } from "../requests";
import {
  IUSER,
  UserEditPageProps,
} from "../interfaces/UserInterface";
import AppForm from "./AppForm";
import { FormInstance, message } from "antd";
import { AppDispatch, RootState } from "../redux/store";
import { setUser } from "../redux/slices/userSlice";
import { connect } from "react-redux";
import { fetchUser } from "../redux/actions/userActions";

class UserEditAddComponent extends React.Component<
  UserEditPageProps,
 { isSubmitting: boolean}
> {
  private abortController = new AbortController(); // Initialize AbortController

  constructor(props: UserEditPageProps) {
    super(props);
    this.state = {
      isSubmitting: false,
     
    };
  }


  componentDidMount(): void {
    const { userId } = this.props;
    if (userId) {
      this.props.fetchUser(userId,{signal:this.abortController.signal});
    }
   
  }
componentWillUnmount(): void {
  this.abortController.abort()
  this.props.emptyUser()
}
  componentDidUpdate(prevProps: UserEditPageProps): void {
    // we're using same component to and navigating throught link so this step curcial for clearing state when we're on add page
    if ((this.props.userId !== prevProps.userId)) {
      if(this.props.userId){
        this.props.fetchUser(this.props.userId,{signal:this.abortController.signal});
      }
      else{
        this.abortController.abort()
        this.props.emptyUser()
      }
    }
  }
  handleSubmit(values: any, form: FormInstance) {
    this.setState({
      isSubmitting: true,
    });
    if (this.props.userId) {
      const updateValues: any = {};
      Object.entries(values).forEach(([key1, value1], index) => {
        Object.entries((this.props.user as IUSER)).forEach(([key2, value2], index) => {
          if (key1 === key2) {
            JSON.stringify(value1) !== JSON.stringify(value2)
              ? (updateValues[key1] = value1)
              : "";
          }
          form.setFieldsValue({
            ...this.props.user,
            ...updateValues,
          });
        });
      });

      // this is updating valeus in component level
      request
        .updateUser(this.props.userId, updateValues)
        .then((response) => {
          message.success("User Updated Successfully !");
        })
        .catch((error) => {
          console.info("error in update", error);
        })
        .finally(() => {
          this.setState({
            ...this.state,
            isSubmitting: false,
          });
        });
    } else {
      request
        .postUser(values)
        .then((response) => {
          message.success(response.data.message);
          form.resetFields();
        })
        .catch((err) => {
          message.error(err.response.data.error);
        })
        .finally(() => {
          this.setState({
            ...this.state,
            isSubmitting: false,
          });
        });
    }
  }

  render(): React.ReactNode {
    const { isSubmitting } = this.state;
    const user = this.props.user;
    const inputFields = [
      {
        name: "name",
        placeholder: "Please Enter Name",
        label: "Name",
        rules: [{ required: true, message: "Name  is Required" }],
      },
      {
        name: "email",
        placeholder: "Please Enter Email",
        label: "Email",
        rules: [
          { required: true, message: "Email  is Required ! " },
          {
            type: "email",
            message: "Please enter a valid email address",
          },
        ],
      },
      {
        name: "password",
        placeholder: this.props.userId
          ? "Please Enter New Password"
          : "Please Enter Password",
        label: (this.props.userId ? 'New ' :"") + "Password",
        type: "password",
        rules: [{ required: !Boolean(this.props.userId), message: "Password is Required !" }],
      },
    ];

    return (
      <div className={this.props.className}>
        <AppForm
          fields={inputFields}
          isSubmitting={isSubmitting}
          initialValues={user as IUSER}
          onFinish={this.handleSubmit.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  user: state.users.user,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchUser: (id: string) => dispatch(fetchUser(id)),
  emptyUser: () =>
    dispatch(
      setUser({
        _id: "",
        password: "",
        email: "",
        name: "",
      })
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserEditAddComponent);
