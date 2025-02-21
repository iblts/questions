import { CreateFormProvider, CreateModule } from '@/features/create-module'

export default async function Create() {
	return (
		<CreateFormProvider>
			<CreateModule />
		</CreateFormProvider>
	)
}
