let loginConfig: {
	role: string
	details: string
	link: string
	icon: string
}[] = [
	{
		role: 'School',
		details: 'Enter this section to access the school  portal',
		link: 'https://school.anansehub.com/login',
		icon: '/assets/img/School-Green.svg'
	},
	{
		role: 'Teacher',
		details: 'Enter this section to access the staff/teachers portal',
		link: 'https://teacher.anansehub.com/login',
		icon: '/assets/img/Teacher-Green.svg'
	},
	{
		role: 'Student',
		details: 'Enter this section to access the student portal',
		link: 'https://student.anansehub.com/login',
		icon: '/assets/img/Student-Green.svg'
	},
	{
		role: 'Parent',
		details: 'Enter this section to access the parent portal',
		link: 'https://parent.anansehub.com/login',
		icon: '/assets/img/Parent-Green.svg'
	}
]

if (process.env.NEXT_ENVIRONMENT != 'production') {
	loginConfig = [
		{
			role: 'School',
			details: 'Enter this section to access the school  portal',
			link: 'https://schooldev.anansehub.com/login',
			icon: '/assets/img/School-Green.svg'
		},
		{
			role: 'Teacher',
			details: 'Enter this section to access the staff/teachers portal',
			link: 'https://teacherdev.anansehub.com/login',
			icon: '/assets/img/Teacher-Green.svg'
		},
		{
			role: 'Student',
			details: 'Enter this section to access the student portal',
			link: 'https://studentdev.anansehub.com/login',
			icon: '/assets/img/Student-Green.svg'
		},
		{
			role: 'Parent',
			details: 'Enter this section to access the parent portal',
			link: 'https://parentdev.anansehub.com/login',
			icon: '/assets/img/Parent-Green.svg'
		}
	]
}

export { loginConfig }
