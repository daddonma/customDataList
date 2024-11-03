<html>
<head>
    <script src="jquery.min.js"></script>
    <script src="customDataList.js"></script>

    <script src="bootstrap.bundle.min.js"></script>

    <link rel="stylesheet" href="customDataList.css">
    <link rel="stylesheet" href="bootstrap.min.css">

    <style>
        pre code {
            color: #e83e8c;
        }

    </style>

    <script>
        $(document).ready(function () {
            initCustomDataList();
        });
    </script>

</head>
<body>


<div class="container">
    <div class="card mt-4">

        <div class="card-header">
            <h5>
                <u>1. Custom Data List</u>
            </h5>
        </div>
        <div class="card-body">


				<pre>
                    <code>

$(document).ready(function () {
    <span class="text-muted">//Initialisieren der DataList.
        //Standardmäßig werden die Listen für Input-Felder mit der Klasse <span style="color: tomato">.custom-data-list</span> initialisiert
    //Alternativ kann der Funktion auch eine andere Klasse mitgegegeben werden</span>
    initCustomDataList();

    <span class="text-muted">//Die Liste wird wie eine ganz normale DataList erstellt und über das List-Attribut dem Input-Feld mitgegeben
    //(siehe https://www.w3schools.com/tags/tag_datalist.asp)</span>
});
					</code>
				</pre>

            <form method="POST">

                <div class="form-group">
                    <label for="inputMitarbeiter"><b>Mitarbeiter wählen</b></label>
                    <input id="inputMitarbeiter" list="dataListMitarbeiter" type="text"
                           class="form-control custom-data-list" name="mitarbeiter" placeholder="Mitarbeiter" value="">

                    <datalist id="dataListMitarbeiter">
                        <option value="Max Mustermann - Hauptverantwortlicher">Max Mustermann - Hauptverantwortlicher</option>
                        <option value="Max Musterfrau - Hauptverantwortlicher">Max Musterfrau - Hauptverantwortlicher</option>
                        <option value="Theo Tester - Hauptverantwortlicher">Theo Tester - Hauptverantwortlicher</option>
                        <option value="Maria Müller - Hauptverantwortlicher">Maria Müller - Hauptverantwortlicher</option>
                        <option value="Max Mustermann - Ansprechpartner Berichtswesen">Max Mustermann - Ansprechpartner Berichtswesen</option>
                        <option value="Maria Müller - Ansprechpartner Berichtswesen">Maria Müller - Ansprechpartner Berichtswesen</option>
                    </datalist>

                </div>

                <input type="submit" class="float-right">
            </form>
        </div>


    </div>

    <div class="card mt-4">

        <div class="card-header">
            <h5>
                <u>2. Custom Data List mit Option-Groups</u>
            </h5>
        </div>
        <div class="card-body">


				<pre>
                    <code>
<span class="text-muted">//Gruppierte DataLists werden genauso initialisiert wie im oberen Beispiel</span>
<span class="text-muted">//um Gruppierungen zu erstellen müssen die Gruppen mit der CSS-Klasse <span style="color: tomato">.custom-data-list-group</span> angefügt werden</span>
<span class="text-muted">//Beispiel:</span>
<?= htmlspecialchars('<option class="custom-data-list-group">Hauptverantwortlicher</option>')?>
					</code>
				</pre>

            <form method="POST">
				
				<div class="row">
					<div class="col-md-12">
						<div class="form-group">
							<label for="inputMitarbeiterGroup"><b>Mitarbeiter wählen</b></label>
							
							<input id="inputMitarbeiterGroup" list="dataListGroupMitarbeiter" type="text"
								   class="form-control custom-data-list use-value" name="mitarbeiter" placeholder="Mitarbeiter" value="" onchange="console.log('changed to: ' + $(this).val())" autocomplete="off">
							
							<datalist id="dataListGroupMitarbeiter">
								<option class="custom-data-list-group">Hauptverantwortlicher</option>
<option value="1" data-name="Max" data-nachname="Mustermann">Max Mustermann - Hauptverantwortlicher</option>

<option class="custom-data-list-group">Ansprechpartner Arbeitsschutzmanagement-System</option>
<option value="2">Max Musterfrau - Ansprechpartner Arbeitsschutzmanagement-System</option>

<option class="custom-data-list-group">Ansprechpartner Logistik</option>
<option value="3">Theo Tester - Ansprechpartner Logistik</option>
<option value="4">Maria Müller - Ansprechpartner Logistik</option>

<option class="custom-data-list-group">Ansprechpartner Berichtswesen</option>
<option value="5">Max Mustermann - Ansprechpartner Berichtswesen</option>
<option value="6">Maria Müller - Ansprechpartner Berichtswesen</option>

<option class="custom-data-list-group">Weitere Mitarbeiter</option>
<option value="7">Lukas Schmidt</option>
<option value="8">Sophie Bauer</option>
<option value="9">Leon Weber</option>
<option value="10">Anna Fischer</option>
<option value="11">Paul Meyer</option>
<option value="12">Emily Wagner</option>
<option value="13">Jonas Becker</option>
<option value="14">Lena Hoffmann</option>
<option value="15">Noah Schmitt</option>
<option value="16">Mia Richter</option>
<option value="17">Elias Klein</option>
<option value="18">Emma Neumann</option>
<option value="19">Liam Wolf</option>
<option value="20">Hannah Krause</option>
<option value="21">Felix Schwarz</option>
<option value="22">Lea Zimmermann</option>
<option value="23">Tom Braun</option>
<option value="24">Clara Hartmann</option>
<option value="25">Moritz Lange</option>
<option value="26">Nina Schreiber</option>
<option value="27">Julian Busch</option>
<option value="28">Laura Meier</option>
<option value="29">Ben Vogel</option>
<option value="30">Amelie König</option>
<option value="31">Maximilian Fuchs</option>
<option value="32">Maya Kuhn</option>
<option value="33">Jakob Weiß</option>
<option value="34">Sophia Pfeiffer</option>
<option value="35">David Stein</option>
<option value="36">Lilly Frank</option>
<option value="37">Philipp Schuster</option>
<option value="38">Isabella Arnold</option>
<option value="39">Nico Martens</option>
<option value="40">Marlene Seidel</option>
<option value="41">Tim Hoffmann</option>
<option value="42">Lisa Engel</option>
<option value="43">Samuel Böhm</option>
<option value="44">Jana Walter</option>
<option value="45">Tobias Dietrich</option>
<option value="46">Melina Voigt</option>
<option value="47">Florian Sommer</option>
<option value="48">Vanessa Metz</option>
<option value="49">Daniel Horn</option>
<option value="50">Helena Kraus</option>
<option value="51">Patrick Henkel</option>
<option value="52">Fiona Ziegler</option>
<option value="53">Chris Altmann</option>
<option value="54">Eva Roth</option>
<option value="55">Markus Weber</option>
<option value="56">Nina Werner</option>
<option value="57">Kai Jansen</option>
<option value="58">Lena Scholz</option>
<option value="59">Fabian Lenz</option>
<option value="60">Hanna Klose</option>
<option value="61">Simon Bauer</option>
<option value="62">Theresa Brandt</option>
<option value="63">Erik Herrmann</option>
<option value="64">Jasmin Koch</option>
<option value="65">Oliver Nowak</option>
<option value="66">Felicitas Sauer</option>
<option value="67">Johannes Krieg</option>
<option value="68">Elena Vetter</option>
<option value="69">Dominik Wolff</option>
<option value="70">Pia Schilling</option>
<option value="71">Kevin Beck</option>
<option value="72">Sabrina Lorenz</option>
<option value="73">Ralf Bader</option>
<option value="74">Martina Busch</option>
<option value="75">Tom Rudolph</option>
<option value="76">Mira Krämer</option>
<option value="77">Frank Albrecht</option>
<option value="78">Katrin Finke</option>
<option value="79">Benedikt Reich</option>
<option value="80">Nadine Schuster</option>
<option value="81">Michael Kuhne</option>
<option value="82">Sina Jakob</option>
<option value="83">Andreas Vollmer</option>
<option value="84">Ina Kraft</option>
<option value="85">Marco Ebert</option>
<option value="86">Marlena Gerber</option>
<option value="87">David Maurer</option>
<option value="88">Eva Jahn</option>
<option value="89">Julian Keller</option>
<option value="90">Sabine Busch</option>
<option value="91">Daniel Peters</option>
<option value="92">Patricia Hartwig</option>
<option value="93">Lucas Thiel</option>
<option value="94">Bianca Fritz</option>
<option value="95">Gregor Klee</option>
<option value="96">Tanja Köhler</option>
<option value="97">Martin Engel</option>
<option value="98">Lara Dietz</option>
<option value="99">Florian Schenk</option>
<option value="100">Katharina Günther</option>
<option value="101">Patrick Huber</option>
<option value="102">Julia Franke</option>
<option value="103">Dennis Rudolph</option>
<option value="104">Laura Westphal</option>
<option value="105">Alex Schneider</option>
<option value="106">Mona Brand</option>

							</datalist>
						</div>
					</div>
				</div>

                

                <input type="submit" class="float-right">
            </form>
        </div>
    </div>
</div>
</body>
</html>