prepareDynamicFormData(formData: FormData, data: any, parentKey?: string, fieldsToBeDeleted: string[] = []): void {
        if (fieldsToBeDeleted.indexOf(parentKey) === -1) {
            if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
                Object.keys(data).forEach(key => {
                    this.prepareDynamicFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
                });
            } else {
                const value = data == null ? '' : data;
                this.prepareFormField(formData, value, parentKey);
            }
        }
    }
