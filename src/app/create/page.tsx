import { CreateModule } from '@/features/create-module'
import { HookFormProvider } from '@/shared/providers'

export default async function Create() {
	return (
		<HookFormProvider>
			<CreateModule />
		</HookFormProvider>
	)
}
