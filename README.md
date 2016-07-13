# rsuite simple form

see [no-redux branch](https://github.com/rsuite/rsuite-form/tree/no-redux)

## Example

```
import Form from 'rsuite-simple-form';

render() {
    const schema = SchemaBuilder({
        data: StringType('input invalid')
    });
    return (
        <Form.Form schema={schema} onSubmit={(formData) => console.log(formData)}>
            <Form.Field name="data"> <PlainText onChange={() => console.log('custom onChange()')}/> </Form.Field>
            <Form.SubmitButton text="click to submit" />
        </Form.Form>
    );
}
```

## API

### `<Form />`
表单基础组件, 一张表单对于一个 `<Form />`

__props__

- `schema:schema object` 用来校验表单数据.
- `onSubmit:function(formData)` 当提交按钮点击时触发
    + `formData:object` 表单数据, name 作为 key 存储 value

### `<Field />`
表单域组件, 一条表单数据对于一个 `<Field />`

__props__

- `name:string` 表单数据 `name`

__children__

输入控件作为 children 传入

### `<SubmitButton />`
提交按钮组件, 点击时自动调用 `<Form />` 的 `onSubmit` 方法.
