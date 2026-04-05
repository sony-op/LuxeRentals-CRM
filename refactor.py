import re

with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

# We need to extract CalendarTab, NewRentForm, StockTab, AddItemForm, AnalyticsTab, LoginPage
# and move them before `function App() {`
# We also need to add props to them.

components = {
    "CalendarTab": {
        "start_pattern": r"\s+const CalendarTab = \(\) => \{",
        "end_pattern": r"^\s+\};\n",
        "props": "{ rents }",
        "replacement": "<CalendarTab rents={rents} />"
    },
    "NewRentForm": {
        "start_pattern": r"\s+const NewRentForm = \(\) => \{",
        "end_pattern": r"^\s+\};\n",
        "props": "{ inventory, rents, setRents, draftItemId, setDraftItemId, setActiveTab }",
        "replacement": "<NewRentForm inventory={inventory} rents={rents} setRents={setRents} draftItemId={draftItemId} setDraftItemId={setDraftItemId} setActiveTab={setActiveTab} />"
    },
    "StockTab": {
        "start_pattern": r"\s+const StockTab = \(\) => \{",
        "end_pattern": r"^\s+\};\n",
        "props": "{ inventory, rents, setDraftItemId, setActiveTab }",
        "replacement": "<StockTab inventory={inventory} rents={rents} setDraftItemId={setDraftItemId} setActiveTab={setActiveTab} />"
    },
    "AddItemForm": {
        "start_pattern": r"\s+const AddItemForm = \(\{ onAdd \}\) => \{",
        "end_pattern": r"^\s+\};\n",
        "props": "{ onAdd }",
        "replacement": None  # it's only rendered in StockTab as before
    },
    "AnalyticsTab": {
        "start_pattern": r"\s+const AnalyticsTab = \(\) => \{",
        "end_pattern": r"^\s+\};\n",
        "props": "{ rents, inventory }",
        "replacement": "<AnalyticsTab rents={rents} inventory={inventory} />"
    },
    "LoginPage": {
        "start_pattern": r"\s+const LoginPage = \(\) => \{",
        "end_pattern": r"^\s+\};\n",
        "props": "{ loginForm, setLoginForm, setIsAuthenticated }",
        "replacement": "<LoginPage loginForm={loginForm} setLoginForm={setLoginForm} setIsAuthenticated={setIsAuthenticated} />"
    }
}

extracted_blocks = []

app_start = content.find("function App() {")

# To accurately extract, we parse by line, tracking braces.
lines = content.split('\n')
new_lines = []

in_component = False
current_component = None
brace_count = 0
component_lines = []

extracted_components = {}

for line in lines:
    if not in_component:
        found_start = False
        for comp, data in components.items():
            if re.match(data["start_pattern"], line + '\n'):
                in_component = True
                current_component = comp
                # Rewrite signature
                if comp == "AddItemForm":
                    component_lines.append(f"const {comp} = ({data['props']}) => {{")
                else:
                    component_lines.append(f"const {comp} = ({data['props']}) => {{")
                
                # count braces
                brace_count = line.count('{') - line.count('}')
                found_start = True
                break
        
        if not found_start:
            new_lines.append(line)
    else:
        component_lines.append(line)
        brace_count += line.count('{') - line.count('}')
        if brace_count == 0:
            # End of component
            extracted_components[current_component] = "\n".join(component_lines)
            in_component = False
            current_component = None
            component_lines = []

# Now we construct the new content.
# Replace usages in new_lines
content_after_extraction = "\n".join(new_lines)
content_after_extraction = content_after_extraction.replace("<CalendarTab />", components["CalendarTab"]["replacement"])
content_after_extraction = content_after_extraction.replace("<NewRentForm />", components["NewRentForm"]["replacement"])
content_after_extraction = content_after_extraction.replace("<StockTab />", components["StockTab"]["replacement"])
content_after_extraction = content_after_extraction.replace("<AnalyticsTab />", components["AnalyticsTab"]["replacement"])
content_after_extraction = content_after_extraction.replace("<LoginPage />", components["LoginPage"]["replacement"])

# Insert extracted components before function App() {
components_code = "\n\n".join(extracted_components.values()) + "\n\n"

# Now we need to make sure AddItemForm uses AddItemForm properly inside StockTab.
# StockTab already has: <AddItemForm onAdd={(newItem) => ...} /> 
# which is unchanged and correct.

final_content = content_after_extraction.replace("function App() {", components_code + "function App() {")

with open("index.html", "w", encoding="utf-8") as f:
    f.write(final_content)

print("Refactoring complete.")
