#!/bin/bash

COMPONENTS_FILES=$(ls ./src/components/ui/*.tsx | xargs -n1 basename -s .tsx)

# Initialize index.ts file
> ./src/index.ts

for file_name in $COMPONENTS_FILES; do
    echo "export * from './components/ui/${file_name}';" >> ./src/index.ts
done

echo "" >> ./src/index.ts
echo 'import "./index.css";' >> ./src/index.ts
# echo 'import "./styles/globals.css";' >> ./src/index.ts

echo "index.ts gerado:"
cat ./src/index.ts
