# Correção de imports Supabase
$files = @(
    'app/admin/dashboard/page.tsx',
    'app/admin/login/page.tsx',
    'app/hooks/useProducts.ts',
    'app/test-supabase/page.tsx',
    'lib/uploadImage.ts'
)

$corrected = 0

Write-Host 'Iniciando correção de imports Supabase...' -ForegroundColor Cyan

foreach ($file in $files) {
    Write-Host "\nProcessando: $file" -ForegroundColor Yellow

    if (-not (Test-Path $file)) {
        Write-Host '  ❌ Arquivo não encontrado!' -ForegroundColor Red
        continue
    }

    $originalLines = Get-Content $file
    $originalContent = $originalLines -join "`r`n"

    # Backup
    $backup = "$file.bak"
    Copy-Item $file $backup -Force
    Write-Host "  ✅ Backup criado: $backup" -ForegroundColor Green

    # Copia linhas para modificação
    $lines = $originalLines | ForEach-Object { $_ }

    # Padrão regex para import antigo (robusto com espaços)
    $oldPattern = "\s*import\s*\{\s*supabase\s*\}\s*from\s*'@/lib/supabase'\s*;?"
    $lines = $lines | ForEach-Object { $_ -replace $oldPattern, "import { createSupabaseClient } from '@/lib/supabase';" }

    # Encontra índice da última import
    $importEndIndex = -1
    for ($i = 0; $i -lt $lines.Length; $i++) {
        if ($lines[$i] -match '^\s*import') {
            $importEndIndex = $i
        }
    }

    # Verifica se já existe const supabase = createSupabaseClient();
    $hasSupabaseClient = $false
    $supabasePattern = "\s*const\s+supabase\s*=\s*createSupabaseClient\s*\(\s*\)\s*;"
    for ($j = 0; $j -lt $lines.Length; $j++) {
        if ($lines[$j] -match $supabasePattern) {
            $hasSupabaseClient = $true
            break
        }
    }

    if ($importEndIndex -ge 0 -and -not $hasSupabaseClient) {
        # Detecta indent da próxima linha
        $insertIndex = $importEndIndex + 1
        $indent = '  '  # padrão 2 espaços
        if ($insertIndex -lt $lines.Length -and $lines[$insertIndex] -match '^(\s+)') {
            $indent = $matches[1]
        }

        $newLine = "$indent`const supabase = createSupabaseClient();"

        # Insere nova linha
        $newLines = @()
        0..$importEndIndex | ForEach-Object { $newLines += $lines[$_] }
        $newLines += $newLine
        $insertIndex..($lines.Length - 1) | ForEach-Object { $newLines += $lines[$_] }
        $lines = $newLines

        Write-Host '  ✅ Adicionada linha: const supabase' -ForegroundColor Green
    }

    # Verifica se houve mudança
    $newContent = $lines -join "`r`n"
    if ($newContent -ne $originalContent) {
        $lines | Set-Content $file
        Write-Host '  ✅ Arquivo corrigido!' -ForegroundColor Green
        $corrected++
    } else {
        Write-Host '  ℹ️ Nenhuma alteração necessária' -ForegroundColor Gray
    }
}

Write-Host "\n✨ Total de arquivos corrigidos: $corrected / $($files.Length)" -ForegroundColor Cyan