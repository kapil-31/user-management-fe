import React, { useEffect } from 'react';
import { Button, Form, FormInstance, Input, } from 'antd';

type AppFormPropsType  = {
  fields : {label:string,name:string,value?:string, type?:"password"|"text"|string, placeholder:string, required?:boolean, tooltip?:string,rules?:object[]}[]
  initialValues:{[key:string]:any} | null,
  isSubmitting:boolean,
  className?:string
  onFinish:(values : any,form:FormInstance<any>)=>void
  onFinishFailed?:(errorInfo:any['onFinishFailed'],form:FormInstance<any>)=>void;
}



const AppForm: React.FC<AppFormPropsType> = ({fields,className,isSubmitting,initialValues,onFinish,onFinishFailed}) => {
  const [form] = Form.useForm();
  useEffect(()=>{
    form.setFieldsValue(initialValues)
  },[initialValues])
  
  return (
    <Form
      className={className}
      form={form}
      layout="vertical"
      onFinish={(values)=>{
        onFinish(values,form)
      }}
      onFinishFailed={(errorInfo)=>{
        onFinishFailed &&   onFinishFailed(errorInfo,form)
      }}
      
      requiredMark={true}
    >
     {
      fields.map((item,index)=>{
       let input = null;
        switch(item.type){
          case 'password' :
            input = <Input.Password autoComplete='off'  placeholder={item.placeholder} />
            break;
          // we can add other cases to this component like checkbox,datapicker
         case 'text':
         default:
            input = <Input  autoComplete='off' placeholder={item.placeholder} />
            break;
        }
        if(!input) return  null;
        return  <Form.Item   name={item.name} rules={item.rules} key={index} label={item.label} required={Boolean(item.required)} tooltip={item.tooltip}>
          {input}
        </Form.Item>
      })
     }
     
      <Form.Item>
        <Button loading={isSubmitting} htmlType='submit' type="primary">Submit</Button>
      </Form.Item>
      
    </Form>
  );
};

export default AppForm;