interface UpdateField {
  name: 'login' | 'avatar';
  label: string;
  type: 'text' | 'file';
}

interface AddPostField {
  name: 'header' | 'description' | 'tags' | 'image';
  label: string;
	placeholder?: string;
  type: 'text' | 'textarea' | 'file';
	rules: {}[];
}

export const UpdateUserModal: UpdateField[] = [
	{
		name: 'login' , 
		label: 'Login', 
		type: 'text',  
	}, 
	{
		name: 'avatar', 
		label: 'Avatar',  
		type: 'file', 
	}, 
];

export const AddPostModal: AddPostField[] = [
	{
		name: 'header' , 
		label: 'Title', 
		rules: [{ required: true, message: 'Please input your Title!' }], 
		type: 'text', 
	}, 
	{
		name: 'description' , 
		label: 'Description', 
		rules: [{ required: true, message: 'Please input your Description!' }], 
		type: 'textarea', 
	},  
	{
		name: 'tags' , 
		label: 'Tags', 
		rules: [{ required: true, message: 'Please input your Tag(s)!' }], 
		placeholder: 'tag, tag, tag, ...',
		type: 'text', 
	}, 
	{
		name: 'image', 
		label: 'Image', 
		rules: [{ required: true, message: 'Please upload an image!' }], 
		type: 'file', 
	}, 
];