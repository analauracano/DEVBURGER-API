import * as Yup from 'yup';
import Category from '../models/Category';
import User from '../models/User';

class CategoryController {
    async store(request, response) {
        // Validação de entrada
        const schema = Yup.object().shape({
            name: Yup.string().required('Name is required'),
        });

        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ errors: err.errors });
        }

        const user = await User.findByPk(request.userId);

        // Verificar se o usuário é admin
        if (!user || !user.admin) {
            return response.status(401).json({ error: 'Unauthorized' });
        }

        const { name } = request.body;
        const { filename: path } = request.file;

        // Verificar se a categoria já existe
        const categoryExists = await Category.findOne({ where: { name } });

        if (categoryExists) {
            return response.status(400).json({ error: 'Category already exists' });
        }

        // Criar a nova categoria
        const category = await Category.create({ name, path });

        return response.status(201).json(category);
    }

    async update(request, response) {
        // Validação de entrada
        const schema = Yup.object().shape({
            name: Yup.string(),
        });

        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ errors: err.errors });
        }

        const user = await User.findByPk(request.userId);

        // Verificar se o usuário é admin
        if (!user || !user.admin) {
            return response.status(401).json({ error: 'Unauthorized' });
        }

        const { id } = request.params;
        const { name } = request.body;

        // Verificar se a categoria existe
        const category = await Category.findByPk(id);

        if (!category) {
            return response.status(400).json({ error: 'Category not found' });
        }

        // Atualizar a imagem se fornecida
        let path = category.path;
        if (request.file) {
            path = request.file.filename;
        }

        // Verificar se o novo nome já existe
        if (name) {
            const categoryNameExists = await Category.findOne({ where: { name } });

            if (categoryNameExists && categoryNameExists.id !== Number(id)) {
                return response.status(400).json({ error: 'Category name already exists' });
            }
        }

        // Atualizar a categoria
        await category.update({ name, path });

        return response.status(200).json({ message: 'Category updated successfully', category });
    }

    async index(request, response) {
        const categories = await Category.findAll();
        return response.json(categories);
    }
}

export default new CategoryController();