# rsuite form

简单的表单控件, 基本只做两件事

- 收集数据
- 校验数据

see [no-redux branch](https://github.com/rsuite/rsuite-form/tree/no-redux)

## Example

```
import { Form, Field } from 'rsuite-form';

render() {
    const schema = SchemaBuilder({
        email: StringType('input invalid')
    });

    return (
        <Form schema={schema} formData={this.state.data}>
            <Field name="email"> <PlainText onChange={() => console.log('field changed')}/> </Field>
            <SubmitBtn />
        </Form>
    );
}
```

## API

### `<Form />`
表单基础组件, 一张表单对应一个 `<Form />`

__props__

- `schema:schema object` 用来校验表单数据. 请看 [rsuite-schema](https://github.com/rsuite/rsuite-schema)
- `formData: object` 表单数据, 以每项数据的 name 作为 key 存储对应 value
- `onChange:function` 当 formData 发生变化时自动调用该方法

### `<Field />`
表单域组件, 一条表单数据对于一个 `<Field />`

__props__

- `name:string` 表单数据 `name`

__children__

输入控件作为 children 传入, 每个 Field 应仅有一个控件, 否则多余的控件将被忽略.

## License

MIT License
