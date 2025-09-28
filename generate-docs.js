const fs = require('fs');
const path = require('path');
const ts = require('typescript');

// --- Funções Auxiliares de Análise (Parsers) ---

function getJsDoc(node) {
  const jsDoc = node.jsDoc?.[0];
  if (!jsDoc) return { description: 'Nenhuma descrição fornecida.', example: '' };
  const description = jsDoc.comment || '';
  const exampleTag = jsDoc.tags?.find(tag => tag.tagName.getText() === 'example');
  const example = exampleTag?.comment || '';
  return { description: description.trim(), example: example.trim() };
}

function parseComponent(filePath) {
  const sourceCode = fs.readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(path.basename(filePath), sourceCode, ts.ScriptTarget.Latest, true);

  const componentData = {
    filePath,
    selector: '',
    description: '',
    example: '',
    inputs: [],
    outputs: [],
    publicMethods: [],
  };

  const classNode = sourceFile.statements.find(ts.isClassDeclaration);
  if (!classNode) return null;

  const decorator = classNode.decorators?.find(d => {
    const decoratorText = d.getText(sourceFile);
    return decoratorText.startsWith('@Component');
  });
  
  // 👇 --- CORREÇÃO DEFINITIVA --- 👇
  // Removemos a verificação 'isCallExpression' e checamos diretamente se existem argumentos.
  // Isso é muito mais robusto.
  if (!decorator || !decorator.expression.arguments || decorator.expression.arguments.length === 0) {
    return null;
  }
  // --- FIM DA CORREÇÃO ---

  const decoratorArgs = decorator.expression.arguments[0];
  if (ts.isObjectLiteralExpression(decoratorArgs)) {
    decoratorArgs.properties.forEach(prop => {
      if (ts.isPropertyAssignment(prop) && prop.name.getText(sourceFile) === 'selector') {
        if (ts.isStringLiteral(prop.initializer)) {
          componentData.selector = prop.initializer.text;
        }
      }
    });
  }

  const classDocs = getJsDoc(classNode);
  componentData.description = classDocs.description;
  componentData.example = classDocs.example;
  
  classNode.members.forEach(member => {
    const memberName = member.name?.getText(sourceFile);
    if (!memberName || member.modifiers?.some(mod => mod.kind === ts.SyntaxKind.PrivateKeyword) || member.kind === ts.SyntaxKind.Constructor) {
      return;
    }
    
    const memberDocs = getJsDoc(member);
    const initializer = member.initializer;
    
    if (ts.isPropertyDeclaration(member) && initializer && ts.isCallExpression(initializer) && initializer.expression.getText(sourceFile).startsWith('input')) {
      componentData.inputs.push({ name: memberName, type: member.type?.getText(sourceFile) || 'any', description: memberDocs.description, required: initializer.expression.getText(sourceFile).includes('.required') });
    } else if (ts.isPropertyDeclaration(member) && initializer && ts.isCallExpression(initializer) && initializer.expression.getText(sourceFile).startsWith('output')) {
      componentData.outputs.push({ name: memberName, type: member.type?.getText(sourceFile) || 'any', description: memberDocs.description });
    } else if (ts.isMethodDeclaration(member)) {
      const signature = sourceFile.text.substring(member.getStart(), member.body.getStart()).trim();
      componentData.publicMethods.push({ name: memberName, signature, description: memberDocs.description });
    }
  });

  return componentData;
}

// --- Funções de Geração de MDX (sem alterações) ---
function generateApiTable(component) {
    const inputsTable = component.inputs.length > 0 ? `### \`<${component.selector}>\` Inputs
| Propriedade | Tipo | Obrigatório | Descrição |
| ----------- | ---- | ----------- | --------- |
${component.inputs.map(i => `| \`${i.name}\` | \`${i.type}\` | ${i.required ? 'Sim' : 'Não'} | ${i.description} |`).join('\n')}` : '';

    const outputsTable = component.outputs.length > 0 ? `\n### \`<${component.selector}>\` Outputs
| Propriedade | Tipo | Descrição |
| ----------- | ---- | --------- |
${component.outputs.map(o => `| \`(${o.name})\` | \`${o.type}\` | ${o.description} |`).join('\n')}` : '';

    const methodsTable = component.publicMethods.length > 0 ? `\n### \`<${component.selector}>\` Métodos Públicos
| Método | Assinatura | Descrição |
| ------ | ---------- | --------- |
${component.publicMethods.map(m => `| \`${m.name}\` | \`${m.signature}\` | ${m.description} |`).join('\n')}` : '';

    return [inputsTable, outputsTable, methodsTable].filter(Boolean).join('\n\n');
}

function generateGroupMdx(groupName, components) {
  const mainComponent = components.find(c => c.selector === groupName) || components.find(c => c.selector.endsWith(`-${groupName}`)) || components[0];
  const subComponents = components.filter(c => c !== mainComponent);

  let mdx = `---
title: 'Componente: ${groupName}'
description: '${mainComponent.description.split('\n')[0]}'
---

# Componente \`${groupName}\`

${mainComponent.description}

## Exemplo de Uso

\`\`\`html
${mainComponent.example || 'Nenhum exemplo fornecido.'}
\`\`\`

---

## Referência da API

`;

  mdx += generateApiTable(mainComponent);
  subComponents.forEach(sub => {
    mdx += `\n\n---\n\n` + generateApiTable(sub);
  });

  return mdx;
}

// --- Lógica Principal do Script ---

function findAndGenerateDocs(rootDir) {
  const componentGroups = new Map();

  function findComponents(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        findComponents(fullPath);
      } else if (entry.name.endsWith('.ts')) {
        const componentData = parseComponent(fullPath);
        if (componentData && componentData.selector) {
          const groupName = path.basename(path.dirname(fullPath));
          if (!componentGroups.has(groupName)) {
            componentGroups.set(groupName, []);
          }
          componentGroups.get(groupName).push(componentData);
        }
      }
    }
  }

  findComponents(rootDir);

  if (componentGroups.size === 0) {
    console.log('Nenhum componente Angular foi encontrado no diretório fornecido.');
    return;
  }

  for (const [groupName, components] of componentGroups.entries()) {
    console.log(`Gerando documentação para o grupo: ${groupName}...`);
    const mdxContent = generateGroupMdx(groupName, components);
    const outputDir = path.dirname(components[0].filePath);
    const outputPath = path.join(outputDir, `${groupName}.mdx`);
    fs.writeFileSync(outputPath, mdxContent);
    console.log(`✅ Documentação gerada com sucesso em: ${outputPath}`);
  }
}

// --- Ponto de Entrada ---
const targetDir = process.argv[2];

if (!targetDir) {
  console.error('ERRO: Forneça o caminho para o diretório de componentes.');
  console.log('Uso: node generate-docs.js <caminho-para-a-pasta-de-componentes>');
  process.exit(1);
}

if (!fs.existsSync(targetDir)) {
  console.error(`ERRO: Diretório não encontrado em "${targetDir}"`);
  process.exit(1);
}

try {
  findAndGenerateDocs(targetDir);
} catch (error) {
  console.error('Ocorreu um erro inesperado:', error);
}

