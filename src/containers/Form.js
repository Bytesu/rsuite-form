import Form extends '../components/Form.js';
import { connect } from 'react-redux';

export default connect(state => ({
    formData: state.formData
}))(FormWrapper);
