from ortools.sat.python import cp_model

# Dias e horários
DIAS = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"]
HORARIOS = ["07:00", "08:00", "09:00", "10:00", "11:00"]  # 5 períodos por dia

# Turmas
turmas = ["1º ano", "2º ano", "3º ano", "4º ano", "5º ano"]

# Carga horária por componente curricular por turma 
carga_horaria = {
    "1º ano": {
        "Arte": 2,
        "Educação Física": 3,
        "Língua Portuguesa": 5,
        "Matemática": 6,
        "Ensino Religioso": 1,
        "Geografia": 2,
        "História": 2,
        "Ciências": 4
    },
    "2º ano": {
        "Arte": 2,
        "Educação Física": 3,
        "Língua Portuguesa": 5,
        "Matemática": 6,
        "Ensino Religioso": 1,
        "Geografia": 2,
        "História": 2,
        "Ciências": 4
    },
    "3º ano": {
        "Arte": 2,
        "Educação Física": 3,
        "Língua Portuguesa": 5,
        "Matemática": 6,
        "Ensino Religioso": 1,
        "Geografia": 2,
        "História": 2,
        "Ciências": 4
    },
    "4º ano": {
        "Arte": 2,
        "Educação Física": 3,
        "Língua Portuguesa": 5,
        "Matemática": 6,
        "Ensino Religioso": 1,
        "Geografia": 2,
        "História": 2,
        "Ciências": 4
    },
    "5º ano": {
        "Arte": 2,
        "Educação Física": 3,
        "Língua Portuguesa": 5,
        "Matemática": 6,
        "Ensino Religioso": 1,
        "Geografia": 2,
        "História": 2,
        "Ciências": 4
    }
}

# Professores por disciplina (exemplo fictício)
professores_por_disciplina = {
    "Arte": "Prof_Ana",
    "Educação Física": "Prof_Bruno",
    "Língua Portuguesa": "Prof_Carla",
    "Matemática": "Prof_Diego",
    "Ensino Religioso": "Prof_Erica",
    "Geografia": "Prof_Felipe",
    "História": "Prof_Giselle",
    "Ciências": "Prof_Hugo"
}

# Gerar estrutura com professor e carga horária
disciplinas = {}
for turma in turmas:
    disciplinas[turma] = {}
    for comp, carga in carga_horaria[turma].items():
        disciplinas[turma][comp] = {
            "carga": carga,
            "professor": professores_por_disciplina[comp]
        }

# Modelo CP-SAT
def gerar_grade():
    model = cp_model.CpModel()

    # Variáveis: grade[turma][disciplina][dia][horario] = 1 se a disciplina for dada naquele horário
    grade = {}
    for turma in turmas:
        grade[turma] = {}
        for disciplina in disciplinas[turma]:
            grade[turma][disciplina] = {}
            for d in range(len(DIAS)):
                grade[turma][disciplina][d] = {}
                for h in range(len(HORARIOS)):
                    grade[turma][disciplina][d][h] = model.NewBoolVar(f"{turma}_{disciplina}_{d}_{h}")

    # Restrições:

    # 1. Respeitar carga horária semanal por disciplina
    for turma in turmas:
        for disciplina in disciplinas[turma]:
            carga = disciplinas[turma][disciplina]["carga"]
            model.Add(
                sum(grade[turma][disciplina][d][h] for d in range(len(DIAS)) for h in range(len(HORARIOS))) == carga
            )

    # 2. Um professor não pode estar em dois lugares ao mesmo tempo
    for d in range(len(DIAS)):
        for h in range(len(HORARIOS)):
            for prof in set(professores_por_disciplina.values()):
                aulas_professor = []
                for turma in turmas:
                    for disciplina in disciplinas[turma]:
                        if disciplinas[turma][disciplina]["professor"] == prof:
                            aulas_professor.append(grade[turma][disciplina][d][h])
                model.Add(sum(aulas_professor) <= 1)

    # 3. Cada turma só pode ter uma aula por horário
    for turma in turmas:
        for d in range(len(DIAS)):
            for h in range(len(HORARIOS)):
                model.Add(
                    sum(grade[turma][disciplina][d][h] for disciplina in disciplinas[turma]) <= 1
                )

    # 4. Permitir aulas geminadas apenas para Português, Matemática e Ciências, e no máximo 2 consecutivas
    disciplinas_geminadas = ["Língua Portuguesa", "Matemática", "Ciências"]
    for turma in turmas:
        for d in range(len(DIAS)):
            for disciplina in disciplinas[turma]:
                if disciplina not in disciplinas_geminadas:
                    # Não permitir aulas consecutivas para disciplinas que não são geminadas
                    for h in range(len(HORARIOS) - 1):
                        model.Add(grade[turma][disciplina][d][h] + grade[turma][disciplina][d][h + 1] <= 1)
                else:
                    # Para disciplinas geminadas, não permitir mais de 2 consecutivas
                    for h in range(len(HORARIOS) - 2):
                        model.Add(
                            grade[turma][disciplina][d][h] +
                            grade[turma][disciplina][d][h + 1] +
                            grade[turma][disciplina][d][h + 2] <= 2
                        )

    # Solver
    solver = cp_model.CpSolver()
    status = solver.Solve(model)

    if status == cp_model.OPTIMAL or status == cp_model.FEASIBLE:
        for turma in turmas:
            print(f"\nGrade horária para a turma {turma}:")
            for d in range(len(DIAS)):
                print(f"  {DIAS[d]}:")
                for h in range(len(HORARIOS)):
                    encontrou = False
                    for disciplina in disciplinas[turma]:
                        if solver.Value(grade[turma][disciplina][d][h]):
                            print(f"    {HORARIOS[h]} - {disciplina} ({disciplinas[turma][disciplina]['professor']})")
                            encontrou = True
                    if not encontrou:
                        print(f"    {HORARIOS[h]} - Livre")
    else:
        print("Não foi possível encontrar uma solução viável.")

# Executar
if __name__ == "__main__":
    gerar_grade()
