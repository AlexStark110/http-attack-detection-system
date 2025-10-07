#!/bin/bash

# Automated Vercel deployment script
echo "🚀 Starting automated Vercel deployment..."

# Create vercel deployment answers
cat > .vercel-answers << EOF
alexstark110's projects
n
http-attack-detection-system
./

EOF

# Deploy using the answers
vercel --yes --prod --confirm
